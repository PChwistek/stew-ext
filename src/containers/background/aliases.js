import axios from 'axios'
import getServerHostname from '../getServerHostName'
import TabManager from './TabManager'

import { 
  TABS_SNAP, 
  TABS_SETSNAP, 
  AUTH_LOGIN, 
  AUTH_LOGIN_PENDING, 
  AUTH_LOGIN_FAILED, 
  AUTH_LOGIN_SUCCESS,
  TABS_CREATERECIPE,
  TABS_CLEARFIELDS,
  TABS_CREATERECIPE_FAILED,
  TABS_CREATERECIPE_PENDING,
  TABS_CREATERECIPE_SUCCESS,
  TABS_LAUNCHRECIPE,
  TABS_LAUNCHRECIPE_FAILED,
  TABS_LAUNCHRECIPE_PENDING,
  TABS_LAUNCHRECIPE_SUCCESS,
  SEARCH_SETRESULTS_FAILED,
  SEARCH_SETRESULTS_PENDING,
  SEARCH_SETRESULTS_SUCCESS,
  SEARCH_SETROW,
  SEARCH_SELECTRECIPE,
  SEARCH_SETSEARCHTERMS,
  SEARCH_GET_INITIAL_RESULTS,
  SEARCH_SETSEARCHTERMS_POPUP,
  SEARCH_SETSEARCHTERMS_ALIAS,
  POPUP_SYNCRECIPES_FAILED,
  POPUP_SYNCRECIPES,
  POPUP_SYNCRECIPES_PENDING,
  POPUP_SYNCRECIPES_SUCCESS,
  POPUP_OPENED
 } from '../actionTypes'
import { toggleEditing } from '../popup/popup.actions'

const manager = new TabManager()
chrome.storage.local.clear()
const serverUrl = getServerHostname()

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

const getInitialResults = (originalAction) => {
  return async dispatch => {
    const recipes = await manager.fetchAllRecipes()
    dispatch(searchSuccess(recipes))
  }
}

const launchRecipeConfiguration = (originalAction) => {
  return async dispatch => {
    dispatch({ type: TABS_LAUNCHRECIPE_PENDING })
    await manager.nukeAndReplace(originalAction.payload.recipe.config)
    dispatch({ type: TABS_LAUNCHRECIPE_SUCCESS })
  }
}

const createRecipeAlias = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(createRecipePending())
      const tabsState = getState().tabs
      const authState = getState().auth

      const newConfig = []
      let titlesForSearch = []
      for (let index = 0; index < tabsState.session.length; index++) {
        const win = tabsState.session[index]

        titlesForSearch = titlesForSearch.concat(win.tabs.map(tab => tab.title))

        newConfig.push(
          {
          tabs: win.tabs.map(tab => ({
            favIconUrl: tab.favIconUrl, 
            url: tab.url,
            title: tab.title,
            index: tab.index
          }))
        })
      }
      const theRecipe = {
        name: tabsState.recipeForm.recipeName,
        author: authState.loggedInAs,
        tags: tabsState.recipeForm.recipeTags,
        titles: titlesForSearch,
        attributes: ['Popular', 'Favorite'],
        config: newConfig,
      }

      const { jwt } = authState
      const config = {
        headers: { Authorization: `Bearer ${jwt}` }
      }
      const { data: recipeFromServer } = await axios.post(`${serverUrl}/recipe/create`, {...theRecipe }, config)

      dispatch(selectRecipe(recipeFromServer))
      dispatch(toggleEditing())
      await manager.addRecipeToStore(recipeFromServer)
      dispatch(getInitialResults())
      dispatch({ type: TABS_CREATERECIPE_SUCCESS })

    } catch(err) {
      console.log(err)
      dispatch({ type: TABS_CREATERECIPE_FAILED })
    } 
  }
}

const selectRecipe = (selectedRecipe) => {
  return {
    type: SEARCH_SELECTRECIPE,
    payload: {
      selectedRecipe,
    }
  }
}

const selectRecipeFromRow = (originalAction) => {
  const { row } = originalAction.payload
  return (dispatch, getState) => {
    const { results } = getState().search
    const selectedRecipe = results[row]
    dispatch(selectRecipe(selectedRecipe))
  }
}

const createRecipePending = () => {
  return {
    type: TABS_CREATERECIPE_PENDING,
    payload: {}
  }
}

const loginSuccess = (payload) => {
  const { access_token, username, lastUpdated } = payload
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: {
      access_token,
      username,
      lastUpdated
    }
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

const searchSuccess = (results) => {
  return {
    type: SEARCH_SETRESULTS_SUCCESS,
    payload: {
      results
    }
  }
}

const searchRecipes = (originalAction) => {
  return async dispatch => {
    dispatch(setSearchTerms(originalAction))
    const recipes = await manager.searchRecipes(originalAction.payload.searchTerms)
    dispatch(searchSuccess(recipes))
  }
}

const setSearchTerms = (originalAction) => {
  return {
    type: SEARCH_SETSEARCHTERMS_ALIAS,
    payload: {
      searchTerms: originalAction.payload.searchTerms
    }
  }
}

const login = (originalAction) => {
  console.log('logging in')
  return dispatch => {
    dispatch(loginPending())
    axios
      .post(`${serverUrl}/auth/login`, {
        ...originalAction.payload
      })
      .then(res => {
        console.log('success')
        dispatch(loginSuccess(res.data))
        dispatch(syncRecipesWithCloud())
      })
      .catch(err => {
        console.log('failure')
        dispatch(loginFailure(err.message))
      })
  }
}

const syncRecipesWithCloud = () => {

  return (dispatch, getState) => {
    const authState = getState().auth
    const { jwt } = authState
    const config = {
      headers: { Authorization: `Bearer ${jwt}` }
    }

    dispatch({ type: POPUP_SYNCRECIPES_PENDING})
    axios
      .get(`${serverUrl}/recipe/byAuthor`, config)
      .then(res => {
        console.log('res', res)
        manager.updateRecipesFromServer(res.data)
        dispatch({ type: POPUP_SYNCRECIPES_SUCCESS })
        dispatch(getInitialResults())
      })
      .catch(err => {
        console.log('failure', err)
        dispatch({ type: POPUP_SYNCRECIPES_FAILED })
      })
  }
}

const popupSync = () => {
  return (dispatch, getState) => {
    const loggedIn = getState().auth.loggedIn
    if(loggedIn) {
      dispatch(syncRecipesWithCloud())
    }
  }
}

export default {
  [TABS_SNAP]: getCurrentSession,
  [AUTH_LOGIN]: login,
  [TABS_CREATERECIPE]: createRecipeAlias,
  [SEARCH_SETSEARCHTERMS_POPUP]: searchRecipes,
  [SEARCH_GET_INITIAL_RESULTS]: getInitialResults,
  [TABS_LAUNCHRECIPE]: launchRecipeConfiguration,
  [POPUP_OPENED]: popupSync,
  [SEARCH_SETROW]: selectRecipeFromRow,
}