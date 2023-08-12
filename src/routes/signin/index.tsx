import React from 'react';
import AddServerForm from '$components/AddServerForm';
import { useNavigate } from 'react-router';
import { RoutePaths } from '$routes/paths';

const SignIn = () => {
  const navigate = useNavigate();

  return <AddServerForm onAdded={() => navigate(RoutePaths.HOME)} />;
};

export default SignIn;
