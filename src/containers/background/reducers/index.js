
import {combineReducers} from 'redux'
import user from './user'
// import popup from './popup'
import tabs from './tabs'
import search from './search'
import auth from './auth'
import popup from './popup'

export default combineReducers({
  auth,
  user,
  tabs,
  search,
  popup
})