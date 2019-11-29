import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {isauthenticated} from './index';

const PrivateRoute = ({component:Component,...rest}) =>(
    <Route {...rest} render={props=> isauthenticated() ? (
            <Component {...props} />)
        : (<Redirect to={{pathname:'/signin',state:{from: props.location}}}/>)
    } />
)


export default PrivateRoute;

// REFERENCE: https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e
