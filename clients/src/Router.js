import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './shop/home';
import Menu from './shop/manu';
import Signup from './user/signup';
import Singin from './user/singin';



const Routes = () => {
    return (
        <BrowserRouter>
            <Menu />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Singin} />

            </Switch>
        </BrowserRouter>
    )
}

export default Routes