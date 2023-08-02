import React from 'react';
import { Route, createHashRouter, createRoutesFromElements } from 'react-router-dom';
import Home from 'src/routes/home';
import { RoutePaths } from 'src/routes/paths';
import SignIn from 'src/routes/signin';
import Callback from 'src/routes/signin/callback';

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path={RoutePaths.HOME} element={<Home />} />
      <Route path={RoutePaths.SIGN_IN.HOME} element={<SignIn />} />
      <Route path={RoutePaths.SIGN_IN.CALLBACK} element={<Callback />} />
    </>,
  ),
);

export default router;
