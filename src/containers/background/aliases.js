import axios from 'axios'
import TabManager from './TabManager'
import { TABS_SNAP, TABS_SETSNAP, AUTH_LOGIN, AUTH_LOGIN_PENDING, AUTH_LOGIN_FAILED, AUTH_LOGIN_SUCCESS } from '../actionTypes'

const manager = new TabManager()

const getCurrentSession = (originalAction) => {
  console.log('original action', originalAction)
  return async (dispatch) => {
    const session = await manager.getSession()
    dispatch({
      type: TABS_SETSNAP,
      payload: {
        session
      }
    })
  }
}

const loginSuccess = () => {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: {}
  }
}

const loginPending = () => {
  return {
    type: AUTH_LOGIN_PENDING,
    payload: {}
  }
}

const loginFailure = () => {
  return {
    type: AUTH_LOGIN_FAILED,
    payload: {}
  }
}

const login = (originalAction) => {
  console.log('logging in')
  return dispatch => {
    dispatch(loginPending())
    axios
      .post(`http://localhost:3009/auth/login`, {
        ...originalAction.payload
      })
      .then(res => {
        console.log('success')
        dispatch(loginSuccess(res.data));
      })
      .catch(err => {
        console.log('failure')
        dispatch(loginFailure(err.message));
      })
  }
}

export default {
  [TABS_SNAP]: getCurrentSession,
  [AUTH_LOGIN]: login,
}

/*
export const login = async ({ email, password }) => {
  // Router.push('/account')
  const url = 'http://localhost:3009/auth/login'
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password })
    })

    if (response.status >= 200 && response.status < 300) {
      const { access_token } = await response.json()
      cookie.set('access_token', access_token, { expires: 1 })
      Router.push('/account')
    } else {
      // https://github.com/developit/unfetch#caveats
      let error = new Error(response.statusText)
      error.response = response
      throw error
    }
  } catch (error) {
    const { response } = error
    return response
  }
}
*/