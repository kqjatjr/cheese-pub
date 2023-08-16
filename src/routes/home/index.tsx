import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { RoutePaths } from '$routes/paths';
import { useAccountAtom } from '$atoms/accounts';
import { globalUiAtom } from '$atoms/ui';
import { useAtom } from 'jotai';

const Home = () => {
  const [globalUiState] = useAtom(globalUiAtom);
  const account = useAccountAtom(globalUiState.defaultAccountId);
  const isUserLoggedIn = !!account;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate(RoutePaths.SIGN_IN.HOME);
    }
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <div>
        {account?.id} {account?.accessToken}
      </div>
    </div>
  );
};

export default Home;
