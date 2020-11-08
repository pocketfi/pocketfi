import React from 'react'
import axios from 'axios'
import {Link, match} from 'react-router-dom'
import {PasswordInput} from '../../embedded/Input/PasswordInput/PasswordInput'
import {Button, Form} from 'reactstrap'
import './ResetPassword.sass'

interface ResetPasswordParams {
  token: string;
}

interface ResetPasswordProps {
  match: match<ResetPasswordParams>;
}

class ResetPassword extends React.Component<ResetPasswordProps> {
  state: any = {
    email: '',
    password: '',
    error: false,
    updated: false
  }

  componentDidMount() {
    axios
      .get('/reset', {
        params: {
          resetPasswordToken: this.props.match.params.token
        }
      }).then(res => {
      if (res.data.resetLink) {
        this.setState({
          email: res.data.email,
          error: false
        })
      } else {
        this.setState({
          error: true
        })
      }
    }).catch(err => console.error(err.data))
  }

  handleSubmit() {
    this.updatePassword()
  }

  updatePassword() {
    axios
      .put('/updatePassword', {
        email: this.state.email,
        password: this.state.password
      }).then(res => {
      if (res.data.updated) {
        this.setState({
          updated: true,
          error: false
        })
      } else {
        this.setState({
          updated: false,
          error: true
        })
      }
    }).catch(err => console.error(err.data))
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h4> Problem resetting password. Please send another reset link.</h4>
        </div>
      )
    } else {
      return (
        <div className='reset'>
          <Form>
            <PasswordInput
              id="password"
              value={this.state.password}
              onChange={e => this.setState({password: e.target.value})}
            />
            <Button onClick={() => this.handleSubmit()}>
              Update password
            </Button>
          </Form>
          {this.state.updated && (
            <div>
              <p>
                Your password has been successfully reset. Please try login again.
              </p>
              <Link className='link' to='/login'>
                Login
              </Link>
            </div>
          )}
        </div>
      )
    }
  }
}

export default ResetPassword
