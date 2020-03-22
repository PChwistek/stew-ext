import axios from 'axios'
import manager from '../TabManager'
import { getInitialResults } from './searchAliases'
import { addEditListeners, removeEditListeners, addInAppListeners, removeInAppListeners } from '../background'
import { handle401 }from './authAliases'
import getServerHostname from '../../getServerHostName'

import { 
  AUTH_CLEAR_ERROR,
  AUTH_UPDATEDSYNC,
  POPUP_SYNCRECIPES_FAILED,
  POPUP_SYNCRECIPES_PENDING,
  POPUP_SYNCRECIPES_SUCCESS,
  POPUP_TOGGLEEDITING_ALIAS,
  AUTH_SET_FROM_STORE
} from '../../actionTypes'

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
          console.log('data', data)
          manager.updateRecipesFromServer(data.recipes)
          dispatch({ type: POPUP_SYNCRECIPES_SUCCESS })
          dispatch({ type: AUTH_UPDATEDSYNC, payload: { lastUpdated: data.lastUpdated }})
          dispatch(getInitialResults())
        } else {
          dispatch({ type: POPUP_SYNCRECIPES_SUCCESS })
        }
      })
      .catch(err => {
        console.log(err)
        dispatch(handle401(err))
        dispatch({ type: POPUP_SYNCRECIPES_FAILED })
      })
  }
}


export const popupSync = (originalAction) => {
  return async (dispatch, getState) => {

    const auth = getState().auth

    if(!auth || !auth.jwt) {
      console.log('from store')
      const { jwt, username, lastUpdated} = await manager.getAuth()
      console.log('jwt', jwt)
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
        addInAppListeners()
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
