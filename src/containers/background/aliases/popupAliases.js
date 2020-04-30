import axios from 'axios'
import { defaultManager as manager } from '../tabmanager'
import { getInitialResults } from './searchAliases'
import { addEditListeners, removeEditListeners } from '../background'
import { handle401 }from './authAliases'
import getServerHostname from 'Containers/getServerHostName'

import { 
  AUTH_CLEAR_ERROR,
  AUTH_UPDATEDSYNC,
  POPUP_SYNCRECIPES_FAILED,
  POPUP_SYNCRECIPES_PENDING,
  POPUP_SYNCRECIPES_SUCCESS,
  POPUP_TOGGLEEDITING_ALIAS,
  AUTH_SET_FROM_STORE
} from 'Containers/actionTypes'

const serverUrl = getServerHostname()

export const syncRecipesWithCloud = (isForced) => {

  return (dispatch, getState) => {
    const authState = getState().auth
    const { jwt, lastUpdated } = authState
    const config = {
      headers: { Authorization: `Bearer ${jwt}` }
    }

    dispatch({ type: POPUP_SYNCRECIPES_PENDING})
    axios
      .post(`${serverUrl}/recipe/sync`, { lastUpdated, isForced }, config)
      .then(res => {
        const { data } = res
        if(!data.upToDate || isForced) {
          manager.updateRecipesFromServer(data.recipes)
          dispatch({ type: POPUP_SYNCRECIPES_SUCCESS })
          dispatch({ type: AUTH_UPDATEDSYNC, payload: { lastUpdated: data.lastUpdated }})
          dispatch(getInitialResults())
        } else {
          dispatch({ type: POPUP_SYNCRECIPES_SUCCESS })
        }
      })
      .catch(err => {
        dispatch(handle401(err))
        dispatch({ type: POPUP_SYNCRECIPES_FAILED })
      })
  }
}


export const popupSync = (originalAction) => {
  return async (dispatch, getState) => {

    const auth = getState().auth

    if(!auth || !auth.jwt) {
      const { jwt, username, lastUpdated} = await manager.getAuth()
      if(jwt !== null) {
        dispatch({
          type: AUTH_SET_FROM_STORE,
          payload: {
            jwt,
            username,
            lastUpdated
          }
        })
      }
    }

    const loggedIn = getState().auth.loggedIn
    const terms = getState().search.terms

    if(loggedIn) {
      dispatch(syncRecipesWithCloud(false))
      if(terms == '') {
        getInitialResults()
      }
    } else {
      dispatch({ type: AUTH_CLEAR_ERROR})
    }
  }
}

export const toggleEditAlias = (originalAction) => {
  const { forced } = originalAction.payload
  return async (dispatch) => {
    
    if(forced) {
      addEditListeners()
    } else {
      removeEditListeners()
    }

    dispatch({ 
      type: POPUP_TOGGLEEDITING_ALIAS, 
      payload: { 
        ...originalAction.payload
      } 
    })
  }
}
