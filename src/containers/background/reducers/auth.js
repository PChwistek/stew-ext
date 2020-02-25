import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_PENDING, AUTH_LOGIN_FAILED } from '../../actionTypes'

const initialState = {
  loggedIn: false,
  isPending: false,
  username: '',
  jwt: '',
  updatedOn: ''
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
        username: action.payload.username
      })
    case AUTH_LOGIN_FAILED:
      return Object.assign({}, state, {
        loggedIn: false,
        isPending: false
      })
    default:
      return state
  }
}