import { 
  AUTH_LOGIN_SUCCESS, 
  AUTH_LOGIN_PENDING, 
  AUTH_LOGIN_FAILED, 
  AUTH_INVALID, 
  AUTH_UPDATEDSYNC, 
  AUTH_CLEAR_ERROR, 
  AUTH_LOGOUT_ALIAS,
  AUTH_SET_FROM_STORE

} from 'Containers/actionTypes'

const initialState = {
  loggedIn: false,
  isPending: false,
  username: '',
  jwt: '',
  lastUpdated: '',
  error: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_PENDING:
      return Object.assign({}, state, {
        isPending: true
      })
    case AUTH_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: true,
        isPending: false,
        jwt: action.payload.access_token,
        username: action.payload.username,
        lastUpdated: action.payload.lastUpdated,
        error: ''
      })
    case AUTH_LOGIN_FAILED:
      return Object.assign({}, state, {
        loggedIn: false,
        isPending: false,
        error: action.payload.error
      })
    case AUTH_INVALID:
      return Object.assign({}, state, {
        ...initialState
      })
    case AUTH_CLEAR_ERROR: 
      return Object.assign({}, state, {
        error: '',
      })
    case AUTH_UPDATEDSYNC:
      return Object.assign({}, state, {
        lastUpdated: action.payload.lastUpdated
      })
    case AUTH_SET_FROM_STORE:
      return Object.assign({}, state, {
        loggedIn: true,
        isPending: false,
        jwt: action.payload.jwt,
        username: action.payload.username,
        lastUpdated: action.payload.lastUpdated,
        error: ''
      })
    case AUTH_LOGOUT_ALIAS:
      return initialState
    default:
      return state
  }
}