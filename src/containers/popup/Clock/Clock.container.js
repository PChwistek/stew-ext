import { connect } from 'react-redux'
import Clock from './Clock'
import { startTimer, stopTimer } from '../popup.actions'

const stateToProps = ({ timer }) => ({
  activeSession: timer.running,
  time: timer.time
})

const dispatchToProps = {
  startTimer: () => startTimer(8000),
  stopTimer
}

export default connect(stateToProps, dispatchToProps)(Clock)
