import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthnticated } from './index';

function adminRouter({ component: Component, ...rest }) {
    return (

        <Route
            {...rest}
            render={props =>
                isAuthnticated() && isAuthnticated().user.role === 'admin' ? (
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
export default adminRouter