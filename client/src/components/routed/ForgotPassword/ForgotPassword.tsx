import React from "react";
import {EmailInput} from "../../embedded/Input/EmailInput/EmailInput";
import {Button, Form} from "reactstrap";
import axios from "axios";
import './ForgotPassword.sass'
import {Link} from "react-router-dom";
import {Text} from "../../embedded/Text/Text";

export interface ForgotPasswordProps {

}

class ForgotPassword extends React.Component<ForgotPasswordProps> {
  state: any = {
    email: '',
    showError: false,
    messageFromServer: ''
  }

  recoveryPassword(email: string) {
    axios
      .post('/forgotPassword', {email})
      .then(res => {
          if (res.data ==='email not in db'){
            this.setState({
              showError: true,
              messageFromServer: ''
            });
          } else if (res.data === 'email sent'){
            this.setState({
              showError: false,
              messageFromServer: 'email sent'
            })
          }
      }).catch(err =>{
        console.error(err.data)
    })
  }

  handleSubmit() {
    this.recoveryPassword(this.state.email);
  }

  render() {
    return (
      <div className='forgot'>
        <Form>
          <EmailInput
            id="email"
            value={this.state.email}
            onChange={e => this.setState({email: e.target.value})}
          />
          <Button onClick={() => this.handleSubmit()}>
            Reset by email
          </Button>
        </Form>
        {this.state.showError && (
          <div>
            <p>
              That email address isn't recognized. Please try again or register for a new account.
            </p>
            <Link className='hint' to='/login'>
              Login
            </Link>
          </div>
        )}
        {this.state.messageFromServer === 'email sent' && (
          <div>
            <Text value='Password reset email successfully sent!'/>
            <Link className='link' to='/login'>
              Login
            </Link>
          </div>
        )}
      </div>
    )
  }
}

export default ForgotPassword;
