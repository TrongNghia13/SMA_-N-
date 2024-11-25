import logo from '../../logo.svg';
import './app.scss';
import React, { Suspense, Fragment } from 'react';
import { Spin } from 'antd';
import { Helmet } from "react-helmet";
import RouteApp from '../../routes';
import { Form } from "antd";
import { Route, Routes,BrowserRouter } from "react-router-dom";
import PrivateRoute from "../../routes/privateRoute"
//import Login from "../pages/login/Login";
 const Login = React.lazy(() => import('../../pages/login'));
 const CateMonth = React.lazy(() => import('../../pages/cateMonthPage'));
 const CateSteelType = React.lazy(() => import('../../pages/cateSteelType'));
 const CateProductionBatchNo = React.lazy(() => import('../../pages/cateProductionBatchNo'));

const Homepage = React.lazy(() => import('../shared/layout/index'));

const loading = () => <div className="spin-loading"><Spin tip="Loading ..." /></div>;
const App: React.FC = () => {
  return (
    <Fragment>
      <Helmet>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0" />
        <meta charSet="utf-8" />
        <title>SMA Application</title>
      </Helmet>
      <Suspense fallback={loading()}>
        <RouteApp />
      </Suspense>
    </Fragment>
  );
}

export default App;
