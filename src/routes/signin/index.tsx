import React, { useEffect, useState } from 'react';
import MastodonService from '$activityPub/MastodonService';
import { Application } from '$activityPub/MastodonService.types';
import { useNavigate } from 'react-router';
import { RoutePaths } from '$routes/paths';

const createApp = async (service: MastodonService) => {
  const app = await service.postApps({
    clientName: 'Cheese App',
    redirectUris: [window.electron.getEntry().oauth],
  });
  return app;
};

const SignIn = () => {
  const [serverName, setServerName] = useState('https://mastodon.social');
  const [authorizationCode, setAuthorizationCode] = useState<string>(null);
  const [service, setService] = useState<MastodonService>();
  const [app, setApp] = useState<Application>();
  const [token, setToken] = useState<string>();
  const navigate = useNavigate();

  const getToken = async () => {
    const token = await service.postToken({
      grantType: 'authorization_code',
      clientId: app.client_id,
      code: authorizationCode,
      redirectUri: app.redirect_uri,
      scopes: ['read', 'write'],
      clientSecret: app.client_secret,
    });
    if (token.access_token) {
      setToken(token.access_token);
      sessionStorage.setItem('ACCESS_TOKEN', token.access_token);
    } else {
      alert('Error');
    }
  };

  const getAuthCode = (service: MastodonService, app: Application) => {
    const authWindow = window.open(
      service.getAuthorizeUrl({
        clientId: app.client_id,
        redirectUri: app.redirect_uri,
        responseType: 'code',
      }),
    );
    window.addEventListener('message', (event) => {
      if (event.origin !== location.origin) {
        return;
      }
      setAuthorizationCode(event.data.code);
      authWindow.close();
    });
  };

  const handleClickSingInBtn = async () => {
    if (!serverName) {
      alert('Please enter the server name');
      return;
    }

    const service = new MastodonService({ baseUrl: serverName });
    const app = await createApp(service);
    getAuthCode(service, app);

    setService(service);
    setApp(app);
  };

  useEffect(() => {
    if (!authorizationCode) return;
    getToken();
  }, [authorizationCode]);

  useEffect(() => {
    if (token) {
      navigate(RoutePaths.HOME);
    }
  }, [token]);

  return (
    <div>
      <h1>SignIn</h1>
      <input placeholder="enter server name" value={serverName} onChange={(e) => setServerName(e.target.value)} />
      <button onClick={handleClickSingInBtn}>Sign in</button>
      <div>code: {authorizationCode}</div>
    </div>
  );
};

export default SignIn;
