import React from 'react';
import {Button, Form} from 'reactstrap';
import {connect} from 'react-redux';
import {AuthState} from '../../../types/AuthState';
import * as ac from "../../../actions/authActions";

import {AuthUser} from '../../../types/AuthUser';
import {EmailInput} from '../../embedded/Input/EmailInput/EmailInput';
import {PasswordInput} from '../../embedded/Input/PasswordInput/PasswordInput';
import {Link} from 'react-router-dom';
import {LoginUser} from '../../../types/LoginUser';
import './Login.sass'
import GoogleLogin, {GoogleLoginResponse} from "react-google-login";

export interface LoginProps extends AuthState {
  login(user: AuthUser): void;
  oauthGoogle(googleUser : GoogleLoginResponse): void;
}

class Login extends React.Component<LoginProps> {
  constructor(props: LoginProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  state: any = {
    email: '',
    password: ''
  };

  responseGoogle(googleUser: any){
      this.props.oauthGoogle(googleUser);
      console.log({accessToken: googleUser});
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
          clientId= {''}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: AuthState) => ({
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps, ac)(Login);
