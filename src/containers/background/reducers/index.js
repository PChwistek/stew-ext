
import {combineReducers} from 'redux'
import count from './count'
import timer from './timer'
import session from './session'

export default combineReducers({
  session,
  count,
  timer
})