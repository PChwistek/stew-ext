import { connect } from 'react-redux'
import { Popup } from './Popup'
import { getCurrentTabs, nextRow, previousRow } from './popup.actions'

const stateToProps = ({ auth, user, popup, search }) => ({
  loggedIn: auth.loggedIn,
  user,
  popup,
})

const dispatchToProps = {
  getCurrentTabs,
  nextRow,
  previousRow
}

export default connect(stateToProps, dispatchToProps)(Popup)
