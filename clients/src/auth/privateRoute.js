import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthnticated } from './index';

function PrivateRoute({ component: Component, ...rest }) {
    return (

        <Route
            {...rest}
            render={props =>
                isAuthnticated() ? (
                    <Component />
                ) : (<Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                />
                    )}
        />
    )


}
export default PrivateRoute