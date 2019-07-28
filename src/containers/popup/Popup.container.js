import { connect } from 'react-redux'
import { Popup } from './Popup'
import { addCount, goToDashboard, startTimer } from './popup.actions'

const stateToProps = () => ({
  
})

const dispatchToProps = {
  goToDashboard,
  addCount,
  startTimer,
}

export default connect(stateToProps, dispatchToProps)(Popup)
