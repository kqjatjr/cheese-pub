import { accountsAtom } from '$atoms/accounts';
import { useAccountList } from '$hooks/useAccountList';
import React from 'react';
import Feed from './Feed';
import { useAtomValue } from 'jotai';
import { Avatar } from '@nextui-org/react';

const MainView = () => {
  const { getAccount } = useAccountList();
  const instances = useAtomValue(accountsAtom);

  const renderFeed = (instance: Instance) => {
    const account = getAccount(instance);
    const serverName = account?.url.split('/')[2];
    return (
      account && (
        <div
          className="w-instance h-full bg-mainColor p-3 rounded-[14px] max-w-[360px] flex flex-col gap-3 min-w-[360px]"
          key={instance.id}
        >
          <div className="flex items-center gap-3">
            <div>
              <Avatar radius="md" key={account.id} className="cursor-pointer" src={account.avatar} />
            </div>
            <p>{account.username + '@' + serverName}</p>
          </div>
          <Feed instance={instance} />
        </div>
      )
    );
  };

  return (
    <div className='flex gap-2 w-full h-full justify-items-start overflow-hidden h-screen" p-[15px]'>
      {instances.map((instance) => renderFeed(instance))}
    </div>
  );
};

export default MainView;
