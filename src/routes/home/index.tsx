import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { RoutePaths } from '$routes/paths';
import { accountsAtom } from '$atoms/accounts';
import { useAtomValue } from 'jotai';
import Feed from '$routes/home/components/Feed';
import AddServerFab from '$routes/home/components/AddServerFab';

const Home = () => {
  const navigate = useNavigate();
  const instances = useAtomValue(accountsAtom);
  const isUserLoggedIn = instances.length > 0;

  useEffect(() => {
    if (!isUserLoggedIn && instances.length === 0) {
      navigate(RoutePaths.SIGN_IN.HOME);
    }
  }, [isUserLoggedIn]);

  if (!isUserLoggedIn) return null;

  return (
    <>
      <div className="flex gap-2 justify-items-start">
        {instances.map((instance) => (
          <div className="w-2/6" key={instance.id}>
            <Feed instance={instance} />
          </div>
        ))}
      </div>
      <AddServerFab />
    </>
  );
};

export default Home;
