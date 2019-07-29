import { connect } from 'react-redux'
import { Popup } from './Popup'
import { addCount, goToDashboard, startTimer, stopTimer } from './popup.actions'

const stateToProps = () => ({
  
})

const dispatchToProps = {
  goToDashboard,
  addCount,
  startTimer,
  stopTimer
}

export default connect(stateToProps, dispatchToProps)(Popup)
