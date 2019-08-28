import { TIMER } from '../../actionTypes'
import Clock from './Clock'
import store from '../store'

const theClock = new Clock()

export const startInterval = (milliseconds) => {
  console.log('milli', milliseconds)
  theClock.setActions(() => store.dispatch({ type: TIMER.TICK }), () => store.dispatch({ type: TIMER.FINISHED }))
  theClock.setClock(milliseconds)

  return {
    type: TIMER.START_INTERVAL_SUCCESS,
    payload: {
      milliseconds,
    }
  }
}

export const pauseTimer = () => {
  theClock.pause()
  return {
    type: TIMER.PAUSE_SUCCESS
  }
}

export const resumeTimer = () => {
  theClock.resume()
  return {
    type: TIMER.RESUME_SUCCESS
  }
}

export const clearInterval = () => {
  theClock.clearClock()
  return {
    type: TIMER.STOP_TIMER_SUCCESS
  }
}

export const endEarly = () => {
  clearInterval()
  return {
    type: TIMER.END_EARLY_SUCCESS
  }
}