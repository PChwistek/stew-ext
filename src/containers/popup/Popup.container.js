import { connect } from 'react-redux'
import { Popup } from './Popup'
import { getCurrentTabs } from './popup.actions'

const stateToProps = ({ user, popup }) => ({
  user,
  popup,
})

const dispatchToProps = {
  getCurrentTabs
}

export default connect(stateToProps, dispatchToProps)(Popup)
