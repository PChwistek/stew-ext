import { connect } from 'react-redux'
import Menu from './Menu'
import { logout } from '../popup.actions'

const stateToProps = () => ({
})

const dispatchToProps = {
  logout
}

export default connect(stateToProps, dispatchToProps)(Menu)
