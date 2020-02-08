import { connect } from 'react-redux'
import CreateTab from './CreateTab'
import { removeTabFromSnap, getCurrentTabs, removeWindowFromSnap } from '../popup.actions'

const stateToProps = ({ tabs }) => ({
  tabs,
})

const dispatchToProps = {
  removeTabFromSnap,
  getCurrentTabs,
  removeWindowFromSnap,
}

export default connect(stateToProps, dispatchToProps)(CreateTab)
