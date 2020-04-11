import React from 'react';
import {Button, Form} from 'reactstrap';
import {connect} from 'react-redux';
import {AuthState} from '../../../types/AuthState';
import {AuthUser} from '../../../types/AuthUser';
import {EmailInput} from '../../embedded/Input/EmailInput/EmailInput';
import {PasswordInput} from '../../embedded/Input/PasswordInput/PasswordInput';
import {Link} from 'react-router-dom';
import {LoginUser} from '../../../types/LoginUser';
import GoogleLogin from "react-google-login";
import './Login.sass'
import * as actions from '../../../actions/authActions';

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

  responseGoogle(authResponse: any) {
    this.props.oauthGoogle(authResponse);
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
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login with google"
          onSuccess={(authResponse) => this.responseGoogle(authResponse)}
          onFailure={(authResponse) => this.responseGoogle(authResponse)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: AuthState) => ({
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps, actions)(Login);
