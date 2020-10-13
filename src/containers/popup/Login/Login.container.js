import { connect } from 'react-redux'
import Login from './Login'
import { login, launchOAuth } from 'Popup/popup.actions'

const stateToProps = ({ auth }) => ({
  pending: auth.pending,
  loggedIn: auth.loggedIn,
  error: auth.error
})

const dispatchToProps = {
  login,
  launchOAuth,
}

export default connect(stateToProps, dispatchToProps)(Login)
