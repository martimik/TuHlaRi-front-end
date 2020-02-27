import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const AuthorizedRoute = props => {
    const { path, children, authorized, component, exact } = props;
    const Component = component;
    return (
        <Route exact={exact} path={path}>
            {authorized ? children || <Component /> : <Redirect to="/" />}
        </Route>
    );
};

export default AuthorizedRoute;

AuthorizedRoute.propTypes = {
    path: PropTypes.string,
    children: PropTypes.any,
    authorized: PropTypes.bool,
    component: PropTypes.any,
    exact: PropTypes.bool
};

AuthorizedRoute.defaultProps = {
    authorized: false,
    exact: false
};
