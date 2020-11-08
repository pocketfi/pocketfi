import React from 'react'
import {Redirect, Route, RouteProps} from 'react-router-dom'
import {AppState} from '../../../store'
import {connect} from 'react-redux'

export interface PrivateRouteProps extends RouteProps {
  token: boolean
}

class PrivateRoute extends Route<PrivateRouteProps> {

  render() {
    return (
      !this.props.token ?
        <Redirect to="/login"/> :
        <Route path={this.props.path} component={this.props.component}/>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  // @ts-ignore
  token: state.auth.token
})

export default connect(mapStateToProps)(PrivateRoute)
