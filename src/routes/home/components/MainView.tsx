import { accountsAtom } from '$atoms/accounts';
import { useAccountList } from '$hooks/useAccountList';
import React from 'react';
import Feed from './Feed';
import { useAtomValue } from 'jotai';

const MainView = () => {
  const { getAccount } = useAccountList();
  const instances = useAtomValue(accountsAtom);
  return (
    <div className='flex gap-2 w-full h-full justify-items-start overflow-hidden h-screen" p-[15px]'>
      {instances.map((instance) => (
        <div className="w-2/6  h-ful" key={instance.id}>
          {getAccount(instance)?.username}
          <Feed instance={instance} />
        </div>
      ))}
    </div>
  );
};

export default MainView;
