import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { RoutePaths } from '$routes/paths';

const Home = () => {
  const isUserLoggedIn = sessionStorage.getItem('ACCESS_TOKEN');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate(RoutePaths.SIGN_IN.HOME);
    }
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
