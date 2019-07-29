import { TIMER } from '../../actionTypes'
import Clock from './Clock'
import store from '../store'

const theTimer = new Clock()

export const startInterval = (milliseconds) => {
  
  theTimer.setIntervalAction(() => store.dispatch({ type: TIMER.TICK }))
  theTimer.setTimer(milliseconds)

  return {
    type: TIMER.START_INTERVAL_SUCCESS,
    payload: {
      milliseconds,
    }
  }
}

export const clearInterval = () => {
  theTimer.clearTimer()
  return {
    type: TIMER.STOP_TIMER_SUCCESS
  }
}