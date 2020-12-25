import React , {Component} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthnticated } from './index';

const PrivateRoute = ({ component: Component, ...rest }) => {
    <Route 
    {...rest} 
    render={props => 
        isAuthnticated() ? (
        <Component {...props} />
        ):( <Redirect
             to={{ pathname: "/signin",
             state: { from: props.location } 
            }}
             />
        )} 
        />


}
export default PrivateRoute