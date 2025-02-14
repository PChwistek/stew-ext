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
import { defaultManager as manager } from '../tabmanager'
import getServerHostname from 'Containers/getServerHostName'
import { syncRecipesWithCloud } from './popupAliases'
import { trackLogin, trackLogout } from '../../analytics'

const serverUrl = getServerHostname()

export const handle401 = (error) => {
  if(error.response.status === 401) {
    return dispatch => { 
      dispatch({ type: AUTH_INVALID })
    }
  }
}

export const oAuthAction = () => {

  return async (dispatch) => {
      const theToken = await manager.handleOAuth()
      const { data: { email, id } } = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${theToken}`)

      dispatch(loginPending())
      if (!theToken) {
        dispatch(loginFailure('Trouble connecting to Google OAuth.'))
      }
      axios
      .post(`${serverUrl}/auth/oauth-ext`, {
        email,
        tokenId: theToken,
      })
      .then(res => {
        dispatch(loginSuccess(res.data))
        dispatch(syncRecipesWithCloud(true))
      })
      .catch(err => {
        let errorMsg = ''
        if(err.message == 'Network Error') {
          errorMsg = 'Trouble connecting to server.'
        } else {
          errorMsg = 'Sorry, we couldn\'t find an account with those details.'
        }
        dispatch(loginFailure(errorMsg))
      })
  }
}

export const loginSuccess = (payload) => {
  const { access_token, username, lastUpdated, userId, orgs } = payload
  trackLogin(true)
  manager.setAuth({ jwt: access_token, username, lastUpdated, userId, orgs })
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: {
      userId,
      access_token,
      username,
      lastUpdated,
      orgs,
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
  trackLogin(false)
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
  trackLogout()
  return async (dispatch) => {
    dispatch({ type: AUTH_LOGOUT_ALIAS })
    dispatch({ type: SEARCH_RESET })
    dispatch({ type: TABS_RESET })
    manager.setAuth({ jwt: null, username: null, lastUpdated: null, userId: null, orgs: null })
    const token = await manager.getOAuthToken()
    axios.post(`https://oauth2.googleapis.com/revoke?token=${token}`)
    manager.revokeOAuthToken()
  }
}