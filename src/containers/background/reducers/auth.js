import { AUTH_LOGIN_SUCCESS } from '../../actionTypes'

const initialState = {
  loggedIn: false,
  loggedInAs: '',
  jwt: '',
  updatedOn: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: true,
      })
    default:
      return state
  }
}