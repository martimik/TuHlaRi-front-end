import React from "react";
import { Switch, Route } from "react-router-dom";
import CreateProduct from "./CreateProduct";
import CreateUser from "./CreateUser";
import UsersView from "./UsersView";
import Settings from "./Settings";
import DeletedProducts from "./DeletedProducts";
import ProductsView from "./ProductsView";
import ProductView from "./ProductView";
import AuthorizedRoute from "./AuthorizedRoute";
import Homepage from "./HomePage";
import PropTypes from "prop-types";

const USERGROUP = {
    ADMIN: "0",
    PRODUCT_OWNER: "1",
    SALESPERSON: "2"
};

const Routes = ({ authorization }) => (
    <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/products" component={ProductsView} />
        <Route path="/product/:id">
            <ProductView />
        </Route>
        <AuthorizedRoute
            authorized={Boolean(authorization.userGroup)}
            path="/settings"
            component={Settings}
        />
        <AuthorizedRoute
            authorized={authorization.userGroup === USERGROUP.ADMIN}
            path="/users"
            component={UsersView}
        />
        <AuthorizedRoute
            authorized={authorization.userGroup === USERGROUP.ADMIN}
            path="/deleted-products"
            component={DeletedProducts}
        />
        <AuthorizedRoute
            authorized={Boolean(authorization.userGroup)}
            path="/create-product"
            component={CreateProduct}
        />
        <AuthorizedRoute
            authorized={authorization.userGroup === USERGROUP.ADMIN}
            path="/create-user"
            component={CreateUser}
        />
    </Switch>
);

Routes.propTypes = {
    authorization: PropTypes.object
};

export default Routes;
