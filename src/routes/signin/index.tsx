import React, { useEffect, useState } from 'react';
import MastodonService from 'src/activityPub/MastodonService';
import { Application } from 'src/activityPub/MastodonService.types';

const SignIn = () => {
  const [service] = useState(() => new MastodonService({ baseUrl: 'https://mastodon.social' }));
  const [result, setResult] = useState<Application>(null);

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
      window.location.href = service.getAuthorizeUrl({
        clientId: result.client_id,
        redirectUri: result.redirect_uri,
        responseType: 'code',
      });
    }
  }, [result]);

  return <div>SignIn</div>;
};

export default SignIn;
