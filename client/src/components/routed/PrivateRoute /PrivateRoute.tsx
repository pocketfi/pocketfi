import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {AuthState} from '../../../types/AuthState';
import {AppState} from '../../../store';
import {connect} from 'react-redux';

export interface PrivateRouteProps extends AuthState, RouteProps {
  isAuthenticated: boolean
}

class PrivateRoute extends Route<PrivateRouteProps> {

  render() {
    return this.props.isAuthenticated ? (<Route path={this.props.path} component={this.props.component}/>) :
      (<Redirect to="/login"/>);
  }
}

const mapStateToProps = (state: AppState) => ({
  // @ts-ignore
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
