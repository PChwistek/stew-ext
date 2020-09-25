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
  AUTH_SET_FROM_STORE,
  SEARCH_SET_SORTBYS,
  SETTINGS_SET_FROM_STORE,
  // POPUP_SET_HELP_INSTALLED,
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
      .then(async res => {
        const { data } = res
        if(!data.upToDate || isForced) {
          dispatch({ type: SEARCH_SET_SORTBYS, payload: { repos: data.repos, favorites: data.favorites } })
          await manager.updateRecipesFromServer(data.recipes)
          manager.setSortBys({ favorites: data.favorites , repos: data.repos })
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
      const { jwt, username, lastUpdated, userId, orgs } = await manager.getAuth()
      if(jwt !== null) {
        dispatch({
          type: AUTH_SET_FROM_STORE,
          payload: {
            jwt,
            username,
            lastUpdated,
            userId,
            orgs
          }
        })
      }

      const { favorites, repos } = await manager.getSortBys()
      if (favorites !== null) {
        dispatch({
          type: SEARCH_SET_SORTBYS,
          payload: {
            favorites, 
            repos,
          }
        })
      }

      const { cleanWorkspace, quickAdd, mergeHelper } = await manager.getSettings()
      if (cleanWorkspace !== null) {
        dispatch({
          type: SETTINGS_SET_FROM_STORE,
          payload: {
            cleanWorkspace,
            quickAdd,
            mergeHelper
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

export const setSettingsAlias = (originalAction) => {
  const { cleanWorkspace, quickAdd, mergeHelper } = originalAction.payload
  return async (dispatch) => {
      manager.setSettings({ cleanWorkspace, quickAdd, mergeHelper })
      dispatch({
        type: SETTINGS_SET_FROM_STORE,
        payload: {
          cleanWorkspace,
          quickAdd,
          mergeHelper
        }
      })
  }
}

// export const setHelpInstalledAlias = (originalAction) => {
  
//   return async (dispatch) => {
//     const isInstalled = manager.getNoticeIsInstalled()
//     if (isInstalled) {
//       dispatch({
//         type: POPUP_SET_HELP_INSTALLED,
//         payload: {
//           isInstalled
//         }
//       })
//     } else {
//       await manager.installNotice()
//       dispatch({
//         type: POPUP_SET_HELP_INSTALLED,
//         payload: {
//           isInstalled
//         }
//       })
//     }
//   }
// }