import React, { useEffect, useState } from 'react';
import MastodonService from '$activityPub/MastodonService';
import { Application } from '$activityPub/MastodonService.types';

const SignIn = () => {
  const [serverName, setServerName] = useState('https://mastodon.social');
  const [service] = useState(() => new MastodonService({ baseUrl: 'https://mastodon.social' }));
  const [result, setResult] = useState<Application>(null);
  const [authorizationCode, setAuthorizationCode] = useState<string>(null);

  const handleClickSingInBtn = async () => {
    //
  };

  useEffect(() => {
    const test = async () => {
      const a = await service.postApps({
        clientName: 'Cheese App',
        redirectUris: [window.electron.getEntry().oauth],
      });
      setResult(a);
    };
    test();
  }, []);

  useEffect(() => {
    if (result) {
      const authWindow = window.open(
        service.getAuthorizeUrl({
          clientId: result.client_id,
          redirectUri: result.redirect_uri,
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
    }
  }, [result]);

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
