import { connect } from 'react-redux'
import Clock from './Clock'
import { startTimer, stopTimer, resumeTimer, pauseTimer, endEarly } from '../popup.actions'

const stateToProps = ({ timer }) => ({
  activeSession: timer.running,
  time: timer.time,
  paused: timer.paused,
})

const dispatchToProps = {
  startTimer: () => startTimer(8000),
  stopTimer,
  resumeTimer,
  pauseTimer,
  endEarly
}

export default connect(stateToProps, dispatchToProps)(Clock)
