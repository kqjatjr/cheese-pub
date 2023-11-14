import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { RoutePaths } from '$routes/paths';
import Feed from '$routes/home/components/Feed';
import AddServerFab from '$routes/home/components/AddServerFab';
import { useAtomValue } from 'jotai';
import { Instance, accountsAtom } from '$atoms/accounts';
import Header from './components/Header';
import Sidebar from '$components/Sidebar';
import generator from 'megalodon';

const Home = () => {
  const navigate = useNavigate();
  const instances = useAtomValue(accountsAtom);
  const isUserLoggedIn = instances.length > 0;
  const [accountList, setAccountList] = useState<Entity.Account[]>([]);

  const getAccountData = async (instance: Instance) => {
    const client = generator(instance.type, instance.url, instance.accessToken);
    const { data } = await client.verifyAccountCredentials();
    setAccountList((prev) => [...prev, data]);
  };

  useEffect(() => {
    instances.forEach((instance) => {
      getAccountData(instance);
    });
  }, [instances]);

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate(RoutePaths.SIGN_IN.HOME);
    }
  }, [instances]);

  if (!isUserLoggedIn) return null;

  return (
    <div className="flex flex-col ">
      <Header title="CHEESE-PUB" />
      <div className="flex gap-2 justify-items-start overflow-hidden h-screen">
        <Sidebar accountList={accountList} />
        <div className='flex gap-2 w-full h-full justify-items-start overflow-hidden h-screen" p-[15px]'>
          {instances.map((instance) => (
            <div className="w-2/6  h-ful" key={instance.id}>
              <Feed instance={instance} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
