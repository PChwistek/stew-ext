import { TIMER } from '../actionTypes'
import { startInterval, clearInterval, pauseTimer, resumeTimer, endEarly } from './timer/timer.actions'

/* these action maps to the actions called by the popup */

const startTimer = (originalAction) => {
  return (dispatch, getState) => {
    const isRunning = getState().timer.running
    if (!isRunning) {
      const milliseconds = originalAction.payload.milliseconds
      dispatch(startInterval(milliseconds))
      return originalAction
    }

  }
}

const stopTimer = (originalAction) => {
  return dispatch => {
    dispatch(clearInterval())
    return originalAction
  }
}

const pauseTime = (originalAction) => {
  return dispatch => {
    dispatch(pauseTimer())
    return originalAction
  }
}

const resumeTime = (originalAction) => {
  return dispatch => {
    dispatch(resumeTimer())
    return originalAction
  }
}

const endTimerEarly = (originalAction) => {
  return dispatch => {
    dispatch(endEarly())
    return originalAction
  }
}


export default {
  [TIMER.START]: startTimer,
  [TIMER.STOP]: stopTimer,
  [TIMER.PAUSE]: pauseTime,
  [TIMER.RESUME]: resumeTime,
  [TIMER.END_EARLY]: endTimerEarly
}