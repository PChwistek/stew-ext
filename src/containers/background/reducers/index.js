
import {combineReducers} from 'redux'
import user from './user'
import popup from './popup'
import tabs from './tabs'

export default combineReducers({
  user,
  popup,
  tabs,
})