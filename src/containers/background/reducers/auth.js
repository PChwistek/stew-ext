import { 
  AUTH_LOGIN_SUCCESS, 
  AUTH_LOGIN_PENDING, 
  AUTH_LOGIN_FAILED, 
  AUTH_INVALID, 
  AUTH_UPDATEDSYNC, 
  AUTH_CLEAR_ERROR, 
  AUTH_LOGOUT_ALIAS,
  AUTH_SET_FROM_STORE,
  SETTINGS_SET_FROM_STORE,
} from 'Containers/actionTypes'

const initialState = {
  loggedIn: false,
  isPending: false,
  username: '',
  userId: '',
  orgs: [],
  jwt: '',
  lastUpdated: '',
  error: '',
  settings: {
    cleanWorkspace: true,
    quickAdd: true,
    mergeHelper: true,
  }
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
        userId: action.payload.userId,
        orgs: action.payload.orgs,
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
        userId: action.payload.userId,
        lastUpdated: action.payload.lastUpdated,
        orgs: action.payload.orgs,
        error: ''
      })
    case SETTINGS_SET_FROM_STORE:
      return Object.assign({}, state, {
        settings: {
          cleanWorkspace: action.payload.cleanWorkspace,
          quickAdd: action.payload.quickAdd,
          mergeHelper: action.payload.mergeHelper,
        }
      })
    case AUTH_LOGOUT_ALIAS:
      return initialState
    default:
      return state
  }
}