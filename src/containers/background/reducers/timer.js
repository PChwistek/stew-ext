import { TIMER } from '../../actionTypes'
import { millisecondsToDigitalClock } from '../../utils/utils'

const initialState = {
  time: '',
  milliseconds: 0,
  terminationTime : 0,
  running: false,
  paused: false,
}

export default (state = initialState, action ) => {
  switch(action.type) {
    case TIMER.START_INTERVAL_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          time: millisecondsToDigitalClock(action.payload.milliseconds),
          milliseconds: action.payload.milliseconds,
          terminationTime : action.payload.milliseconds,
          running: true,
          paused: false,
        }
      )
    case TIMER.STOP:
      return Object.assign(
        {},
        state,
        { running: false }
      )
    case TIMER.STOP_TIMER_SUCCESS:
      return initialState
    case TIMER.TICK:
      return Object.assign(
        {},
        state,
        { milliseconds: state.milliseconds - 1000,
          time: millisecondsToDigitalClock(state.milliseconds - 1000)
        }
      )
    case TIMER.PAUSE_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          paused: true
        }
      )
    case TIMER.RESUME_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          paused: false
        }
      )
    case TIMER.FINISHED:
      return initialState
    case TIMER.END_EARLY_SUCCESS:
      return initialState
    default:
      return state
  }
}