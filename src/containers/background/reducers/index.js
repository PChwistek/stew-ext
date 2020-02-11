
import {combineReducers} from 'redux'
import user from './user'
import popup from './popup'
import tabs from './tabs'
import search from './search'

export default combineReducers({
  user,
  popup,
  tabs,
  search,
})