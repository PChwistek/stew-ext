import { POPUP } from '../actionTypes'

const startTimer = (originalAction) => {
  return (dispatch, getState) => {
    console.log('here')
    originalAction.payload = 'hello'
    return originalAction
  }
}

export default {
  [POPUP.TIMER_START]: startTimer,
}