import { TIMER } from '../actionTypes'
import { startInterval, clearInterval } from './timer/timer.actions'

/* these action maps to the actions called by the popup */

const startTimer = (originalAction) => {
  return (dispatch) => {
    const milliseconds = originalAction.payload.milliseconds
    dispatch(startInterval(milliseconds))
    return originalAction
  }
}

const stopTimer = (originalAction) => {
  return dispatch => {
    dispatch(clearInterval())
    return originalAction
  }
}


export default {
  [TIMER.START]: startTimer,
  [TIMER.STOP]: stopTimer
}