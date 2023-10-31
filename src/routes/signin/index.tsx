import React from 'react';
import AddServerForm from '$components/AddServerForm';
import { useNavigate } from 'react-router';
import { RoutePaths } from '$routes/paths';

const SignIn = () => {
  const navigate = useNavigate();

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
