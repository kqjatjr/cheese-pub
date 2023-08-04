import React from 'react';
import { Route, createHashRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './routes/home';
import { RoutePaths } from './routes/paths';
import SignIn from './routes/signin';

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path={RoutePaths.HOME} element={<Home />} />
      <Route path={RoutePaths.SIGN_IN.HOME} element={<SignIn />} />
    </>,
  ),
);

export default router;
