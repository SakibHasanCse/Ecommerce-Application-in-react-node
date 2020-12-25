import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './auth/privateRoute';
import Home from './shop/home';
import Menu from './shop/manu';
import Signup from './user/signup';
import Singin from './user/singin';
import userDashbord from './user/userDashbord';



const Routes = () => {
    return (
        <BrowserRouter>
            <Menu />
            <Switch>
                <Route path="/" exact component={Home} />
                <PrivateRoute path="/dashbord" exact component={userDashbord} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Singin} />

            </Switch>
        </BrowserRouter>
    )
}

export default Routes