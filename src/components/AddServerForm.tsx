import React, { useState } from 'react';
import generator from 'megalodon';
import { Button, Input, Radio, RadioGroup } from '@nextui-org/react';
import { useAtom, useSetAtom } from 'jotai';
import { globalUiAtom } from '$atoms/ui';
import { addAccountAtom } from '$atoms/accounts';
import { nanoid } from 'nanoid';
import { ServiceType } from '$constants/activityPub';

type Props = {
  onAdded?: () => void;
};

const AddServerForm = ({ onAdded }: Props) => {
  const [url, setUrl] = useState('');
  const [globalUiState, setGlobalUiState] = useAtom(globalUiAtom);
  const addAccount = useSetAtom(addAccountAtom);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const serviceType = formData.get('service') as ServiceType;
    const serverUrl = `https://${formData.get('url')}`;

    const service = generator(serviceType, serverUrl);
    const appData = await service.registerApp('Cheese Pub', {
      redirect_uris: window.electron.getEntry().oauth,
    });

    if (!appData.url) {
      alert('no app url');
      return;
    }

    const authWindow = window.open(appData.url);
    window.addEventListener('message', async (event) => {
      if (event.origin !== location.origin) {
        return;
      }
      authWindow?.close();

      const token = await service.fetchAccessToken(
        appData.client_id,
        appData.client_secret,
        event.data.code,
        appData.redirectUri,
      );

      const id = nanoid();

      addAccount({
        id,
        url: serverUrl,
        accessToken: token.accessToken,
        type: serviceType,
      });

      if (!globalUiState.defaultAccountId) {
        setGlobalUiState({ defaultAccountId: id, selectedAccountId: id });
      }
      sessionStorage.setItem('ACCESS_TOKEN', token.access_token);

      onAdded?.();
    });
  };

  return (
    <div className="flex p-5 justify-center items-center w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
        {/* <RadioGroup label="Service" name="service"> */}
        {/* <Radio value={ServiceType.Mastodon} defaultChecked>
            Mastodon
          </Radio> */}
        {/* Miskey 는 mastodon개발 후 추후 지원 */}
        {/* <Radio value={ServiceType.Misskey}>Misskey</Radio> */}
        {/* </RadioGroup> */}
        <Input
          label=""
          name="url"
          className=""
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">https://</span>
            </div>
          }
        />
        <Button type="submit" color="primary" className="bg-cheese mt-2">
          완료
        </Button>
      </form>
    </div>
  );
};

export default AddServerForm;
