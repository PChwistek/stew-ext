import axios from 'axios'
import browser from 'webextension-polyfill'
import getServerHostname from '../getServerHostName'
import TabManager from './TabManager'
import { compareObjects } from '../utils'
import { addListeners, removeListeners } from './background'

import { 
  TABS_SNAP, 
  TABS_SETSNAP, 
  AUTH_LOGIN, 
  AUTH_LOGIN_PENDING, 
  AUTH_LOGIN_FAILED, 
  AUTH_LOGIN_SUCCESS,
  AUTH_INVALID,
  AUTH_LOGOUT,
  AUTH_LOGOUT_ALIAS,
  AUTH_CLEAR_ERROR,
  AUTH_UPDATEDSYNC,
  TABS_SAVERECIPE,
  TABS_DELETERECIPE,
  TABS_DELETERECIPE_PENDING,
  TABS_DELETERECIPE_FAILED,
  TABS_DELETERECIPE_SUCCESS,
  TABS_SAVERECIPE_FAILED,
  TABS_SAVERECIPE_PENDING,
  TABS_SAVERECIPE_SUCCESS,
  TABS_LAUNCHRECIPE,
  TABS_LAUNCHRECIPE_PENDING,
  TABS_LAUNCHRECIPE_SUCCESS,
  SEARCH_SETRESULTS_SUCCESS,
  SEARCH_SETROW,
  SEARCH_SETROW_ALIAS,
  SEARCH_SELECTRECIPE,
  SEARCH_GET_INITIAL_RESULTS,
  SEARCH_SETSEARCHTERMS_POPUP,
  SEARCH_SETSEARCHTERMS_ALIAS,
  POPUP_SYNCRECIPES_FAILED,
  POPUP_SYNCRECIPES_PENDING,
  POPUP_SYNCRECIPES_SUCCESS,
  SEARCH_SETSORTBY_ALIAS,
  POPUP_OPENED,
  TABS_RESET,
  SEARCH_RESET,
  SEARCH_SETSORTBY,
  POPUP_TOGGLEEDITING,
  POPUP_TOGGLEEDITING_ALIAS
 } from '../actionTypes'
import { toggleSlide } from '../popup/popup.actions'

const manager = new TabManager()
const serverUrl = getServerHostname()

if(process.env.NODE_ENV === 'development') {
  browser.storage.sync.clear().then(() => {
    browser.storage.sync.set({ stew: { recipes: [] } })
      .then(() => {
        console.log('cache redone')
      })
  })
}

const handle401 = (error) => {
  console.log('error', error)
  if(error.response.status === 401) {
    return dispatch => { 
      dispatch({ type: AUTH_INVALID })
    }
  }
}

const getCurrentSession = (originalAction) => {
  return async (dispatch, getState) => {
    const { tabs } = getState()
    const session = await manager.getSession(tabs.currentWindow.id)
    dispatch({
      type: TABS_SETSNAP,
      payload: {
        session
      }
    })
  }
}

const toggleEditAlias = (originalAction) => {
  const { forced } = originalAction.payload
  return async (dispatch) => {
    
    if(forced) {
      addListeners()
    } else {
      removeListeners()
    }

    dispatch({ 
      type: POPUP_TOGGLEEDITING_ALIAS, 
      payload: { 
        ...originalAction.payload
      } 
    })
  }
}

const getInitialResults = (originalAction) => {
  return async (dispatch, getState) => {
    const { search: { sortedBy, favorites } } = getState()
    let recipes = await manager.fetchAllRecipes()
    if(sortedBy == 'favorites') {
      console.log('recipes')
      recipes = recipes.filter(recipe => favorites.findIndex(fav => fav == recipe._id) > -1)
    }
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

const saveRecipeAlias = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: TABS_SAVERECIPE_PENDING })
      const tabsState = getState().tabs
      const authState = getState().auth
      const searchState = getState().search

      const { isNew } = tabsState
      const { jwt } = authState
      const config = {
        headers: { Authorization: `Bearer ${jwt}` }
      }

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
        attributes: [],
        config: newConfig,
      }

      if(!isNew) {
        const { selectedRecipe } = searchState
        console.log('selectedRecipe', selectedRecipe)
        console.log('the recipe', theRecipe)
        theRecipe._id = selectedRecipe._id

        const areSame = compareObjects(
          { name: theRecipe.name, tags: theRecipe.tags, config: theRecipe.config}, 
          { name: selectedRecipe.name, tags: selectedRecipe.tags, config: selectedRecipe.config}
        )

        if(!areSame) {
          const { data: recipeFromServer } = await axios.patch(`${serverUrl}/recipe/edit`, {...theRecipe}, config)
          dispatch(selectRecipe(recipeFromServer))
          await manager.updateRecipeInStore(recipeFromServer)
        }
        
      } else {
        const { data: recipeFromServer } = await axios.post(`${serverUrl}/recipe/create`, {...theRecipe }, config)
        dispatch(selectRecipe(recipeFromServer))
        await manager.addRecipeToStore(recipeFromServer)
      }
      dispatch(toggleEditAlias())
      dispatch(getInitialResults())
      dispatch({ type: TABS_SAVERECIPE_SUCCESS })
     
    } catch(err) {
      console.log(err)
      if(err && err.status) {
        handle401(err)
      }
      dispatch({ type: TABS_SAVERECIPE_FAILED })
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
  const { rowIndex } = originalAction.payload
  return (dispatch, getState) => {
    const { results } = getState().search
    const selectedRecipe = results[rowIndex]
    dispatch({
      type: TABS_SETSNAP,
      payload: {
        session: selectedRecipe.config
      }
    })
    dispatch({ 
      type: SEARCH_SETROW_ALIAS, 
      payload: {
        selectedRow: rowIndex
      } 
    })
    dispatch(selectRecipe(selectedRecipe))
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

const loginFailure = (error) => {
  return {
    type: AUTH_LOGIN_FAILED,
    payload: {
      error
    }
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
  return async (dispatch, getState) => {
    const { search: { sortedBy, favorites } } = getState()
    dispatch(setSearchTerms(originalAction))
    const recipes = await manager.searchRecipes(originalAction.payload.searchTerms, { sortedBy, filterList: favorites })
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

const syncRecipesWithCloud = (isForced) => {

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

const popupSync = (originalAction) => {
  return (dispatch, getState) => {
    const loggedIn = getState().auth.loggedIn

    if(loggedIn) {
      dispatch(syncRecipesWithCloud(false))
    } else {
      dispatch({ type: AUTH_CLEAR_ERROR})
    }
  }
}

const authLogoutAlias = () => {
  return dispatch => {
    dispatch({ type: AUTH_LOGOUT_ALIAS })
    dispatch({ type: SEARCH_RESET })
    dispatch({ type: TABS_RESET })
  }
}

const removeRecipe = () => {
  return async (dispatch, getState) => {
    const { selectedRecipe } = getState().search
    const authState = getState().auth
    const { jwt } = authState
    const config = {
      headers: { Authorization: `Bearer ${jwt}` }
    }
    dispatch({ type: TABS_DELETERECIPE_PENDING })
    await manager.removeRecipeFromStore(selectedRecipe)
    axios
      .post(`${serverUrl}/recipe/delete`, {
        _id: selectedRecipe._id
      }, config)
      .then(res => {
        dispatch(toggleSlide(false))
        dispatch({ type: TABS_DELETERECIPE_SUCCESS })
      })
      .catch(err => {
        dispatch({ type: TABS_DELETERECIPE_FAILED })
        if(err && err.status) {
          handle401(err)
        }
      })
  }
}

const sortBySearch = (originalAction) => {
  return async (dispatch, getState) => {
    const { searchTerms } = getState().search
    dispatch({
      type: SEARCH_SETSORTBY_ALIAS,
      payload: originalAction.payload
    })
    if(searchTerms) {
      dispatch(searchRecipes({ payload: { searchTerms } }))
    } else {
      dispatch(getInitialResults())
    }
  }
}

export default {
  [TABS_SNAP]: getCurrentSession,
  [AUTH_LOGIN]: login,
  [TABS_SAVERECIPE]: saveRecipeAlias,
  [SEARCH_SETSEARCHTERMS_POPUP]: searchRecipes,
  [SEARCH_GET_INITIAL_RESULTS]: getInitialResults,
  [TABS_LAUNCHRECIPE]: launchRecipeConfiguration,
  [POPUP_OPENED]: popupSync,
  [SEARCH_SETROW]: selectRecipeFromRow,
  [TABS_DELETERECIPE]: removeRecipe,
  [AUTH_LOGOUT]: authLogoutAlias,
  [SEARCH_SETSORTBY]: sortBySearch,
  [POPUP_TOGGLEEDITING]: toggleEditAlias,
}