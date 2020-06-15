import { connect } from 'react-redux'
import Menu from './Menu'
import { logout, setSettings } from '../popup.actions'

const stateToProps = ({ auth }) => ({
  settings: auth.settings,
})

const dispatchToProps = {
  logout,
  setSettings,
}

export default connect(stateToProps, dispatchToProps)(Menu)
