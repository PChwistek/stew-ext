import { connect } from 'react-redux'
import Login from './Login'
import { login } from '../popup.actions'

const stateToProps = () => ({
 
})

const dispatchToProps = {
  login
}

export default connect(stateToProps, dispatchToProps)(Login)
