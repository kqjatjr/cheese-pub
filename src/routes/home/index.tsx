import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { RoutePaths } from '$routes/paths';
import Feed from '$routes/home/components/Feed';
import { useAtomValue } from 'jotai';
import { Instance, accountsAtom } from '$atoms/accounts';
import Header from './components/Header';
import Sidebar from '$components/Sidebar';
import generator, { Entity } from 'megalodon';
import { Spinner } from '@nextui-org/react';
import Editor from '$components/Editor';

export interface IAccount extends Entity.Account {
  instanceId: string;
}

const Home = () => {
  const navigate = useNavigate();
  const instances = useAtomValue(accountsAtom);
  const isUserLoggedIn = instances.length > 0;
  const [accountList, setAccountList] = useState<IAccount[]>([]);
  const [focusInstance, setFocusInstance] = useState<Instance>();

  const getAccountData = async (instance: Instance) => {
    const client = generator(instance.type, instance.url, instance.accessToken);
    const { data } = await client.verifyAccountCredentials();
    setAccountList((prev) => [...prev, { ...data, instanceId: instance.id }]);
  };

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate(RoutePaths.SIGN_IN.HOME);
    }
    setFocusInstance(instances[instances.length - 1]);
    instances.forEach((instance) => {
      getAccountData(instance);
    });
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
          <Sidebar
            accountList={accountList}
            focusInstanceId={focusInstance?.id}
            onChangeFocusInstance={handleChangeFocusInstance}
          />
          <div className='flex gap-2 w-full h-full justify-items-start overflow-hidden h-screen" p-[15px]'>
            {instances.map((instance) => (
              <div className="w-2/6  h-ful" key={instance.id}>
                {accountList.map((account) => {
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
