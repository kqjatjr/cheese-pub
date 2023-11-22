import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { RoutePaths } from '$routes/paths';
import Feed from '$routes/home/components/Feed';
import { useAtomValue } from 'jotai';
import { Instance, accountsAtom } from '$atoms/accounts';
import Header from './components/Header';
import Sidebar from '$components/Sidebar';
import { Spinner } from '@nextui-org/react';
import Editor from '$components/Editor';
import { useAccountList } from '$hooks/useAccountList';

const Home = () => {
  const navigate = useNavigate();
  const instances = useAtomValue(accountsAtom);
  const isUserLoggedIn = instances.length > 0;
  const { accountList } = useAccountList();
  const [focusInstance, setFocusInstance] = useState<Instance>();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate(RoutePaths.SIGN_IN.HOME);
    }
    setFocusInstance(instances[instances.length - 1]);
  }, [instances]);

  const handleChangeFocusInstance = (id: string) => {
    instances.forEach((instance) => {
      if (instance.id === id) setFocusInstance(instance);
    });
  };

  return (
    <div className="flex flex-col ">
      <Header title="CHEESE-PUB" />
      <div className="flex gap-2 justify-items-start overflow-hidden h-screen">
        <Suspense
          fallback={
            <div className="w-full h-full flex justify-center items-center">
              <Spinner color="warning" size="lg" />
            </div>
          }
        >
          <Sidebar focusInstanceId={focusInstance?.id} onChangeFocusInstance={handleChangeFocusInstance} />
          <div className='flex gap-2 w-full h-full justify-items-start overflow-hidden h-screen" p-[15px]'>
            {instances.map((instance) => (
              <div className="w-2/6  h-ful" key={instance.id}>
                {accountList?.map((account) => {
                  if (account.instanceId === instance.id) {
                    return <div key={account.id}>{account.username}</div>;
                  }
                })}
                <Feed instance={instance} />
              </div>
            ))}
          </div>
          <Editor instance={focusInstance} />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
