import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest

  // If we wrap this Route Component with Private Route.. <Route exact path="/login" component={Login} />
  // component will be component = {Login}, ... rest will be exact, path="/login"
  // Pulling out component only because that's what we want to apply condition.
}) => (
  <Route
    {...rest} // will be equal to eact, path="..." ...
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
