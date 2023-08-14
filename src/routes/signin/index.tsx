import React, { useEffect, useState } from 'react';
import MastodonService from '$activityPub/MastodonService';
import { Application } from '$activityPub/MastodonService.types';
import { useNavigate } from 'react-router';
import { RoutePaths } from '$routes/paths';
import { Input } from '@nextui-org/react';

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

  const singInServer = async () => {
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

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('????');
      singInServer();
    }
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <span className="text-4xl md:text-4xl lg:text-6xl xl:text-8xl mb-4 md:mb-8">CHEESE PUB</span>
      <Input
        className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mb-2 md:mb-0 px-4 py-3"
        label="server name"
        placeholder="Please enter the server name and press enter"
        value={serverName}
        onChange={(e) => setServerName(e.target.value)}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

export default SignIn;
