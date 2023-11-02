import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { RoutePaths } from '$routes/paths';
import { accountsAtom } from '$atoms/accounts';
import { useAtomValue } from 'jotai';
import Feed from '$routes/home/components/Feed';
import AddServerFab from '$routes/home/components/AddServerFab';
import Header from './components/Header';

const Home = () => {
  const navigate = useNavigate();
  const instances = useAtomValue(accountsAtom);
  const isUserLoggedIn = instances.length > 0;
  const accessToken = sessionStorage.getItem('ACCESS_TOKEN');

  useEffect(() => {
    if (!accessToken) {
      navigate(RoutePaths.SIGN_IN.HOME);
    }
  }, [accessToken]);

  if (!isUserLoggedIn) return null;

  return (
    <>
      <Header title="CHEESE PUB" />
      <div className="flex gap-2 justify-items-start overflow-hidden h-screen">
        {instances.map((instance) => (
          <div className="w-2/6  h-ful" key={instance.id}>
            <Feed instance={instance} />
          </div>
        ))}
      </div>
      <AddServerFab />
    </>
  );
};

export default Home;
