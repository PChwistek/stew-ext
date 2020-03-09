import { connect } from 'react-redux'
import Login from './Login'
import { login } from '../popup.actions'

const stateToProps = ({ auth }) => ({
  pending: auth.pending,
  loggedIn: auth.loggedIn,
  error: auth.error
})

const dispatchToProps = {
  login
}

export default connect(stateToProps, dispatchToProps)(Login)
