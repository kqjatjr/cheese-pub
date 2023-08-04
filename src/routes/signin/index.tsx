import React, { useEffect, useState } from 'react';
import MastodonService from '$activityPub/MastodonService';
import { Application } from '$activityPub/MastodonService.types';

const SignIn = () => {
  const [service] = useState(() => new MastodonService({ baseUrl: 'https://mastodon.social' }));
  const [result, setResult] = useState<Application>(null);
  const [authorizationCode, setAuthorizationCode] = useState<string>(null);

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
      <div>code: {authorizationCode}</div>
    </div>
  );
};

export default SignIn;
