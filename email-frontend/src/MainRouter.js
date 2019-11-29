import React from 'react';
import PrivateRoute from './auth/PrivateRoute'
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Menu from './core/Menu';
import SendMail from './user/SendMail';
import ViewSent from './mail/ViewSent';
import Search from './mail/Search';



const MainRouter = () => (
    <div>
        <Menu/>
        <Switch>
            <PrivateRoute exact path='/home' component={Home}></PrivateRoute>
            <Route exact path='/signup' component={Signup}></Route>
            <Route exact path='/' component={Signin}></Route>
            <PrivateRoute exact path='/mail/send' component={SendMail}></PrivateRoute>
            <PrivateRoute exact path='/search' component={Search}></PrivateRoute>
            <PrivateRoute exact path='/sent' component={ViewSent}></PrivateRoute>
        </Switch>
    </div>
)

export default MainRouter;