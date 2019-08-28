import { TIMER } from '../../actionTypes'
import Clock from './Clock'
import store from '../store'

const theClock = new Clock()

export const startInterval = (milliseconds) => {
  console.log('milli', milliseconds)
  theClock.setIntervalAction(() => store.dispatch({ type: TIMER.TICK }))
  theClock.setClock(milliseconds)

  return {
    type: TIMER.START_INTERVAL_SUCCESS,
    payload: {
      milliseconds,
    }
  }
}

export const clearInterval = () => {
  theClock.clearClock()
  return {
    type: TIMER.STOP_TIMER_SUCCESS
  }
}