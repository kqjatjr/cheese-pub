import { Button, Input } from '@nextui-org/react';
import React, { FormEvent, useEffect, useState } from 'react';
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    <div className="h-screen flex justify-center items-center">
      <form className="w-60 flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          className="w-full"
          variant="bordered"
          label="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button color="primary">SUBMIT</Button>
      </form>
    </div>
  );
}

export default App;
