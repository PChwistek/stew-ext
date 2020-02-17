import { connect } from 'react-redux'
import Popup from './Popup'
import { getCurrentTabs, toggleCreateView, toggleDetailView } from './popup.actions'

const stateToProps = ({ auth, user, popup }) => ({
  loggedIn: auth.loggedIn,
  user,
  ...popup,
})

const dispatchToProps = {
  getCurrentTabs,
  toggleCreateView,
  toggleDetailView
}

export default connect(stateToProps, dispatchToProps)(Popup)
