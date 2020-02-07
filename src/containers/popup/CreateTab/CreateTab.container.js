import { connect } from 'react-redux'
import CreateTab from './CreateTab'
import { removeTabFromSnap } from '../popup.actions'

const stateToProps = ({ tabs }) => ({
  tabs,
})

const dispatchToProps = {
  removeTabFromSnap,
}

export default connect(stateToProps, dispatchToProps)(CreateTab)
