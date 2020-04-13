import React from 'react';
import {Button, Form} from 'reactstrap';
import {connect} from 'react-redux';
import {AuthState} from '../../../types/AuthState';
import {AuthUser} from '../../../types/AuthUser';
import {EmailInput} from '../../embedded/Input/EmailInput/EmailInput';
import {PasswordInput} from '../../embedded/Input/PasswordInput/PasswordInput';
import {Link} from 'react-router-dom';
import {LoginUser} from '../../../types/LoginUser';
import './Login.sass'
import * as actions from '../../../actions/authActions';
import {GoogleLogin, GoogleLoginInfo} from "react-google-login-component";
import {CLIENT_ID} from "../../../config/const";

export interface LoginProps extends AuthState {
  login(user: AuthUser): void;
  oauthGoogle(googleUser: any): void;
}

class Login extends React.Component<LoginProps> {
  state: any = {
    email: '',
    password: ''
  };

  responseGoogle(authResult: GoogleLoginInfo) {
    const access_token = authResult.getAuthResponse();
    this.props.oauthGoogle(access_token);
  }

  handleSubmit() {
    this.props.login(new LoginUser(this.state.email, this.state.password));
  }

  render() {
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

        <Link className='hint' to='/register'>
          Register
        </Link>
        <div className="react-google-oauth-button-main">
          <div className="react-google-oauth-button-border">
            <div className="react-google-oauth-button-iconWrapper">
              <div className="react-google-oauth-button-icon">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px"
                     viewBox="0 0 48 48">
                  <g>
                    <path fill="#EA4335"
                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4"
                          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05"
                          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853"
                          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </g>
                </svg>
              </div>
            </div>
            <GoogleLogin
              className='react-google-oauth-button-login'
              socialId={CLIENT_ID}
              buttonText='Login with google'
              responseHandler={authResponse => this.responseGoogle(authResponse)}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AuthState) => ({
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps, actions)(Login);
