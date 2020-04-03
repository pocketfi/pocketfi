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
import {Title} from '../../embedded/Title/Title';
import './Login.sass'

export interface LoginProps extends AuthState {
  login(user: AuthUser): void;
}

class Login extends React.Component<LoginProps> {

  state: any = {
    email: '',
    password: ''
  };

  handleSubmit() {
    this.props.login(new LoginUser(this.state.email, this.state.password));
  }

  render() {
    return (
      <div className='login'>
        <Form>
          <Title value='Login'/>
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
      </div>
    );
  }
}

const mapStateToProps = (state: AuthState) => ({
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
