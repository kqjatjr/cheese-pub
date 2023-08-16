import React, { useEffect, useState } from 'react';
import MastodonService from '$activityPub/MastodonService';
import { Application } from '$activityPub/MastodonService.types';
import { useNavigate } from 'react-router';
import { RoutePaths } from '$routes/paths';
import { Input } from '@nextui-org/react';
import { useAtom, useSetAtom } from 'jotai';
import { addAccountAtom } from '$atoms/accounts';
import { ServiceType } from '$constants/activityPub';
import { globalUiAtom } from '$atoms/ui';
import { nanoid } from 'nanoid';

const createApp = async (service: MastodonService) => {
  const app = await service.postApps({
    clientName: 'Cheese App',
    redirectUris: [window.electron.getEntry().oauth],
  });
  return app;
};

const SignIn = () => {
  const [serverName, setServerName] = useState('https://mastodon.social');
  const [authorizationCode, setAuthorizationCode] = useState<string | null>(null);
  const [service, setService] = useState<MastodonService>();
  const [globalUiState, setGlobalUiState] = useAtom(globalUiAtom);
  const addAccount = useSetAtom(addAccountAtom);
  const [app, setApp] = useState<Application>();
  const navigate = useNavigate();

  const getToken = async () => {
    if (!app || !app.client_id || !app.client_secret || !authorizationCode) return;

    const token = await service?.postToken({
      grantType: 'authorization_code',
      clientId: app.client_id,
      code: authorizationCode,
      redirectUri: app.redirect_uri,
      scopes: ['read', 'write'],
      clientSecret: app.client_secret,
    });

    if (!token) return;

    if (token.access_token) {
      const id = nanoid();
      addAccount({
        id,
        url: serverName,
        accessToken: token.access_token,
        type: ServiceType.Mastodon,
      });

      if (!globalUiState.defaultAccountId) {
        setGlobalUiState({ defaultAccountId: id, selectedAccountId: id });
      }

      navigate(RoutePaths.HOME);

      sessionStorage.setItem('ACCESS_TOKEN', token.access_token);
    } else {
      alert('Error');
    }
  };

  const getAuthCode = (service: MastodonService, app: Application) => {
    if (!app.client_id) return;

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
      authWindow?.close();
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <span className="text-4xl md:text-4xl lg:text-6xl xl:text-8xl mb-4 md:mb-8">CHEESE PUB</span>
      <Input
        className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mb-2 md:mb-0 px-4 py-3"
        label="server name"
        placeholder="Please enter the server name and press enter"
        value={serverName}
        onChange={(e) => setServerName(e.target.value)}
        onKeyDown={handleKeyUp}
      />
    </div>
  );
};

export default SignIn;
