import { accountsAtom } from '$atoms/accounts';
import React from 'react';
import Feed from './Feed';
import { useAtomValue } from 'jotai';

const MainView = () => {
  const instances = useAtomValue(accountsAtom);

  return (
    <div className='flex gap-2 w-full h-full justify-items-start overflow-hidden h-screen" p-[15px]'>
      {instances.map((instance) => (
        <Feed instance={instance} key={instance.id} />
      ))}
    </div>
  );
};

export default MainView;
