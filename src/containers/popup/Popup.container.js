import { connect } from 'react-redux'
import { Popup } from './Popup'
import { addCount, goToDashboard } from './popup.actions'

const stateToProps = () => ({
  
})

const dispatchToProps = {
  goToDashboard,
  addCount,
}

export default connect(stateToProps, dispatchToProps)(Popup)
