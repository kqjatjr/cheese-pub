import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { RoutePaths } from '$routes/paths';
import Feed from '$routes/home/components/Feed';
import AddServerFab from '$routes/home/components/AddServerFab';
import { useAtomValue } from 'jotai';
import { accountsAtom } from '$atoms/accounts';
import Header from './components/Header';

const Home = () => {
  const navigate = useNavigate();
  const instances = useAtomValue(accountsAtom);
  const isUserLoggedIn = instances.length > 0;

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
        <div className="bg-darkColor">asdf</div>
        <div className='flex gap-2 w-full h-full justify-items-start overflow-hidden h-screen" p-[15px]'>
          {instances.map((instance) => (
            <div className="w-2/6  h-ful" key={instance.id}>
              <Feed instance={instance} />
            </div>
          ))}
        </div>
      </div>
      <AddServerFab />
    </div>
  );
};

export default Home;
