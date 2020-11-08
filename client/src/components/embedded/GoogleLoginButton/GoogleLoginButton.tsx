import React from 'react'
import './GoogleLoginButton.sass'
import {connect} from 'react-redux'
import {AppState} from '../../../store'
import {oauthGoogle} from '../../../actions/authActions'
import {FaGoogle} from 'react-icons/all'
import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from 'react-google-login'

export const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || ''

export interface LoginProps {
  oauthGoogle(access_token: string): void;
}

export class GoogleLoginButton extends React.Component<LoginProps> {

  oauthScopes = {
    VIEW_EMAIL: 'https://www.googleapis.com/auth/userinfo.email'
  }

  handleResponseGoogle(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
    const access_token = (response as GoogleLoginResponse).accessToken
    this.props.oauthGoogle(access_token)
  }

  render() {
    return <GoogleLogin
      className='login-button'
      scope={`${this.oauthScopes['VIEW_EMAIL']}`}
      clientId={CLIENT_ID}
      onSuccess={authResponse => this.handleResponseGoogle(authResponse)}
      render={(props) => <FaGoogle onClick={props.onClick}/>}
    />
  }
}

const mapStateToProps = (state: AppState) => ({})

export default connect(mapStateToProps, {oauthGoogle})(GoogleLoginButton)
