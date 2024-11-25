import React from 'react';
import PrivateRoute from "./privateRoute";
import { Routes, Route } from 'react-router-dom'

const Login = React.lazy(() => import('../pages/login'));
// const CateMonth = React.lazy(() => import('../pages/cateMonthPage'));
const Homepage = React.lazy(() => import('../components/shared/layout'));


const RouteApp = () => {
  return (
    <>
      <Routes>
        <Route element={<Login />} path="/Login" />
        <Route element={<PrivateRoute />}>
          <Route element={<Homepage />} path="/" />
        </Route>
      </Routes>
    </>
  );
}

export default RouteApp;
