import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {AuthProps} from '../../interfaces/AuthProps';
import {login} from '../../actions/loginUser';
import {RegisterUser} from '../../interfaces/RegisterUser';
import {AuthForm} from '../../interfaces/AuthForm';

export interface RegisterProps extends AuthForm {
  register(user: RegisterUser): void;
}

class RegisterModal extends React.Component<RegisterProps> {
  state: any = {
    name: '',
    email: '',
    password: ''
  };

  constructor(props: RegisterProps) {
    super(props);
  }

  handleSubmit() {
    this.props.register(new RegisterUser(this.state.name, this.state.email, this.state.password));
  }

  render() {
    return (
      <div className='login'>
        <Form>
          <FormGroup>
            <Input
              value={this.state.name}
              onChange={e => this.setState({name: e.target.value})}
              type="text"
              name="name"
              id="name"
              placeholder="Name"
            />
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
            >
              Login
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state: AuthProps) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(RegisterModal
);
