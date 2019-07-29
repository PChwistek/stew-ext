
import {combineReducers} from 'redux'
import count from './count'
import timer from './timer'

export default combineReducers({
  count,
  timer
})