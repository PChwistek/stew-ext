import { connect } from 'react-redux'
import { Popup } from './Popup'
import { goToDashboard } from './popup.actions'

const stateToProps = ({ session }) => ({
  active: session.active
})

const dispatchToProps = {
  goToDashboard,
}

export default connect(stateToProps, dispatchToProps)(Popup)
