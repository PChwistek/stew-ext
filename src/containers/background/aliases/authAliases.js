import axios from 'axios'
import { 
  AUTH_LOGIN_PENDING, 
  AUTH_LOGIN_FAILED, 
  AUTH_LOGIN_SUCCESS,
  AUTH_INVALID,
  AUTH_LOGOUT_ALIAS,
  TABS_RESET,
  SEARCH_RESET,
} from 'Containers/actionTypes'
import manager from '../TabManager'
import getServerHostname from 'Containers/getServerHostName'
import { syncRecipesWithCloud } from './popupAliases'

const serverUrl = getServerHostname()

export const handle401 = (error) => {
  console.log('error', error)
  if(error.response.status === 401) {
    return dispatch => { 
      dispatch({ type: AUTH_INVALID })
    }
  }
}

export const loginSuccess = (payload) => {
  const { access_token, username, lastUpdated } = payload
  manager.setAuth({ jwt: access_token, username, lastUpdated })
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: {
      access_token,
      username,
      lastUpdated
    }
  }
}

export const loginPending = () => {
  return {
    type: AUTH_LOGIN_PENDING,
    payload: {}
  }
}

export const loginFailure = (error) => {
  return {
    type: AUTH_LOGIN_FAILED,
    payload: {
      error
    }
  }
}

export const login = (originalAction) => {
  return dispatch => {
    dispatch(loginPending())
    axios
      .post(`${serverUrl}/auth/login`, {
        ...originalAction.payload
      })
      .then(res => {
        dispatch(loginSuccess(res.data))
        dispatch(syncRecipesWithCloud(true))
      })
      .catch(err => {
        let errorMsg = ''
        console.log('error', err)
        if(err.message == 'Network Error') {
          errorMsg = 'Trouble connecting to server.'
        } else {
          errorMsg = 'Sorry, we couldn\'t find an account with those details.'
        }
        dispatch(loginFailure(errorMsg))
      })
  }
}

export const authLogoutAlias = () => {
  return dispatch => {
    dispatch({ type: AUTH_LOGOUT_ALIAS })
    dispatch({ type: SEARCH_RESET })
    dispatch({ type: TABS_RESET })
    manager.setAuth({ jwt: null, username: null, lastUpdated: null})
  }
}