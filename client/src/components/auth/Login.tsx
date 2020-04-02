import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {LoginUser} from '../../interfaces/LoginUser';
import {AuthProps} from '../../interfaces/AuthProps';
import {login} from '../../actions/loginUser';
import {AuthForm} from '../../interfaces/AuthForm';
import {AuthUser} from '../../interfaces/AuthUser';

export interface LoginProps extends AuthForm {
  login(user: AuthUser): void;
}

class Login extends React.Component<LoginProps> {

  state: any = {
    email: '',
    password: ''
  };

  constructor(props: LoginProps) {
    super(props);
  }

  handleSubmit() {
    this.props.login(new LoginUser(this.state.email, this.state.password));
  }

  render() {
    return (
      <div className='login'>
        <Form>
          <FormGroup>
            <Input
              value={this.state.email}
              onChange={e => this.setState({email: e.target.value})}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
            <Input
              value={this.state.password}
              onChange={e => this.setState({password: e.target.value})}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <Button
              onClick={() => this.handleSubmit()}
              value='Login'
            />
          </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state: AuthProps) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
