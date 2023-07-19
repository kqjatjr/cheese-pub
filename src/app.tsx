import React, { useEffect, useState } from 'react';
import MastodonService from 'src/activityPub/MastodonService';
import { Application } from 'src/activityPub/MastodonService.types';

function App() {
  const [service] = useState(() => new MastodonService({ baseUrl: 'https://mastodon.social' }));
  const [result, setResult] = useState<Application>(null);
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    const test = async () => {
      const a = await service.postApps({
        clientName: 'Cheese App',
        redirectUris: [MastodonService.REDIRECT_URL_FOR_CODE],
      });
      setResult(a);
    };
    test();
  }, []);

  useEffect(() => {
    if (result) {
      window.open(
        service.getAuthorizeUrl({
          clientId: result.client_id,
          redirectUri: result.redirect_uri,
          responseType: 'code',
        }),
      );
    }
  }, [result]);

  const handleSubmit = async () => {
    const token = service.postToken({
      grantType: 'authorization_code',
      clientId: result.client_id,
      redirectUri: MastodonService.REDIRECT_URL_FOR_CODE,
      clientSecret: result.client_secret,
      code,
    });
    console.log(token);
  };

  return (
    <div>
      <input value={code} onChange={(e) => setCode(e.target.value)}></input>
      <button onClick={handleSubmit}> submit</button>
    </div>
  );
}

export default App;
