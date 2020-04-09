import React from 'react';
import {Button, Form} from 'reactstrap';
import {connect} from 'react-redux';
import {AuthState} from '../../../types/AuthState';
import {login} from '../../../actions/authActions';
import {AuthUser} from '../../../types/AuthUser';
import {EmailInput} from '../../embedded/Input/EmailInput/EmailInput';
import {PasswordInput} from '../../embedded/Input/PasswordInput/PasswordInput';
import {Link} from 'react-router-dom';
import {LoginUser} from '../../../types/LoginUser';
import './Login.sass'
import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";

export interface LoginProps extends AuthState {
  login(user: AuthUser): void;
}

class Login extends React.Component<LoginProps> {

  state: any = {
    email: '',
    password: ''
  };

  responseGoogle(googleUser: GoogleLoginResponse | GoogleLoginResponseOffline){


    console.log({accessToken: googleUser})
    // Make user login in your system
    // login success tracking...
  }

  handleSubmit() {
    this.props.login(new LoginUser(this.state.email, this.state.password));
  }

  preLoginTracking(): void {
    console.log('Attemp to login with google');
  }

  errorHandler(error: string): void{
    // handle error if login got failed...
    console.error(error)
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
          clientId= '882065851022-oec80nq5tmg71dj8r68d81cc0cgt1anf.apps.googleusercontent.com'
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

export default connect(mapStateToProps, {login})(Login);
