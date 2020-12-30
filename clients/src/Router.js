import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateCategory from './admin/AddCategory';
import CreateProduct from './admin/AddProduct';
import AdminRouter from './auth/adminPrivate';
import PrivateRoute from './auth/privateRoute';
import Home from './shop/home';
import Menu from './shop/manu';
import adminInformation from './user/adminDashbord';
import Signup from './user/signup';
import Singin from './user/singin';
import userDashbord from './user/userDashbord';



const Routes = () => {
    return (
        <BrowserRouter>
            <Menu />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Singin} />
                <PrivateRoute path="/dashbord" exact component={userDashbord} />
                <AdminRouter path="/admin/dashbord" exact component={adminInformation}  />
                <AdminRouter path="/admin/create/category" exact component={CreateCategory}  />
                <AdminRouter path="/admin/create/product" exact component={CreateProduct}  />

            </Switch>
        </BrowserRouter>
    )
}

export default Routes