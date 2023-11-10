import React, { useEffect } from 'react';
import AddServerForm from '$components/AddServerForm';
import { useNavigate } from 'react-router';
import { RoutePaths } from '$routes/paths';
import { useAtomValue } from 'jotai';
import { accountsAtom } from '$atoms/accounts';

const SignIn = () => {
  const navigate = useNavigate();
  const instances = useAtomValue(accountsAtom);
  const isUserLoggedIn = instances.length > 0;

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate(RoutePaths.HOME);
    }
  }, [instances]);

  if (!isUserLoggedIn) return null;

  return (
    <div className="flex items-center h-screen w-screen flex-col gap-y-[20px] pt-[20%]">
      <div className="flex flex-col items-end">
        <span className="text-cheese text-[96px] font-title leading-[90px]">CHEESE PUB</span>
        <span className="text-white text-[16px] font-400">The Activity Pub Hub</span>
      </div>
      <div className="w-[50%] min-w-[500px] max-w-[600px]">
        <AddServerForm onAdded={() => navigate(RoutePaths.HOME)} />
      </div>
    </div>
  );
};

export default SignIn;
