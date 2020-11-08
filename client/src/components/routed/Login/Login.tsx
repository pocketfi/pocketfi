import React from 'react'
import {Button, Form} from 'reactstrap'
import {connect} from 'react-redux'
import {AuthState} from '../../../types/AuthState'
import {AuthUser} from '../../../types/AuthUser'
import {EmailInput} from '../../embedded/Input/EmailInput/EmailInput'
import {PasswordInput} from '../../embedded/Input/PasswordInput/PasswordInput'
import {Link, RouteComponentProps} from 'react-router-dom'
import {LoginUser} from '../../../types/LoginUser'
import './Login.sass'
import * as actions from '../../../actions/authActions'
import {AppState} from '../../../store'
import {GoogleLoginButton} from '../../embedded/GoogleLoginButton/GoogleLoginButton'

export interface LoginProps extends AuthState, RouteComponentProps {
  login(user: AuthUser): void;

  oauthGoogle(access_token: string): void;
}

class Login extends React.Component<LoginProps> {
  state: any = {
    email: '',
    password: ''
  }

  responseGoogle(access_token: string) {
    this.props.oauthGoogle(access_token)
  }

  handleSubmit() {
    this.props.login(new LoginUser(this.state.email, this.state.password))
  }

  render() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/overview')
    }
    return (
      <div className='login'>
        <Form>
          <EmailInput
            id="email"
            value={this.state.email}
            onChange={e => this.setState({email: e.target.value})}
          />
          <PasswordInput
            id="password"
            value={this.state.password}
            onChange={e => this.setState({password: e.target.value})}
          />
          <Button onClick={() => this.handleSubmit()}>
            Login
          </Button>
        </Form>
        <GoogleLoginButton oauthGoogle={access_token => this.responseGoogle(access_token)}/>
        <Link to='/forgot_password'>
          Forgot password?
        </Link>
        <Link className='hint' to='/register'>
          Register
        </Link>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  // @ts-ignore
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, actions)(Login)
