import React from 'react'
import {Button, Form, Input} from 'reactstrap'
import {connect} from 'react-redux'
import {AuthState} from '../../../types/AuthState'
import {RegisterUser} from '../../../types/RegisterUser'
import './../Login/Login.sass'
import {EmailInput} from '../../embedded/Input/EmailInput/EmailInput'
import {PasswordInput} from '../../embedded/Input/PasswordInput/PasswordInput'
import {Link} from 'react-router-dom'
import {register} from '../../../actions/registerActions'

export interface RegisterProps extends AuthState {
  register(user: RegisterUser): void;
}

class Register extends React.Component<RegisterProps> {
  state: any = {
    name: '',
    email: '',
    password: ''
  }

  handleSubmit() {
    this.props.register(new RegisterUser(this.state.name, this.state.email, this.state.password))
  }

  render() {
    return (
      <div className='register login'>
        <Form>
          <Input
            value={this.state.name}
            onChange={e => this.setState({name: e.target.value})}
            type="text"
            name="name"
            id="name"
            placeholder="Name"
          />
          <EmailInput
            value={this.state.email}
            onChange={e => this.setState({email: e.target.value})}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
          <PasswordInput
            value={this.state.password}
            onChange={e => this.setState({password: e.target.value})}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <PasswordInput
            value={this.state.password}
            onChange={e => this.setState({password: e.target.value})}
            placeholder="Repeat password"
            id="password-repeat"
          />
          <Button
            onClick={() => this.handleSubmit()}
          >
            Register
          </Button>
        </Form>
        <Link className='hint' to='/login'>
          Login
        </Link>
      </div>
    )
  }
}

const mapStateToProps = (state: AuthState) => ({
  isAuthenticated: state.isAuthenticated
})

export default connect(mapStateToProps, {register})(Register)
