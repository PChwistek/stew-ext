import axios from 'axios'
import getServerHostname from '../getServerHostName'
import TabManager from './TabManager'
import { compareObjects } from '../utils'

import { 
  TABS_SNAP, 
  TABS_SETSNAP, 
  AUTH_LOGIN, 
  AUTH_LOGIN_PENDING, 
  AUTH_LOGIN_FAILED, 
  AUTH_LOGIN_SUCCESS,
  AUTH_INVALID,
  TABS_SAVERECIPE,
  TABS_CLEARFIELDS,
  TABS_DELETERECIPE,
  TABS_DELETERECIPE_PENDING,
  TABS_DELETERECIPE_FAILED,
  TABS_DELETERECIPE_SUCCESS,
  TABS_SAVERECIPE_FAILED,
  TABS_SAVERECIPE_PENDING,
  TABS_SAVERECIPE_SUCCESS,
  TABS_LAUNCHRECIPE,
  TABS_LAUNCHRECIPE_FAILED,
  TABS_LAUNCHRECIPE_PENDING,
  TABS_LAUNCHRECIPE_SUCCESS,
  SEARCH_SETRESULTS_FAILED,
  SEARCH_SETRESULTS_PENDING,
  SEARCH_SETRESULTS_SUCCESS,
  SEARCH_SETROW,
  SEARCH_SELECTRECIPE,
  SEARCH_CLEARSELECTEDRECIPE,
  SEARCH_SETSEARCHTERMS,
  SEARCH_GET_INITIAL_RESULTS,
  SEARCH_SETSEARCHTERMS_POPUP,
  SEARCH_SETSEARCHTERMS_ALIAS,
  POPUP_SYNCRECIPES_FAILED,
  POPUP_SYNCRECIPES,
  POPUP_SYNCRECIPES_PENDING,
  POPUP_SYNCRECIPES_SUCCESS,
  POPUP_OPENED,
  POPUP_TOGGLE_SLIDE
 } from '../actionTypes'
import { toggleEditing, toggleSlide } from '../popup/popup.actions'

const manager = new TabManager()
chrome.storage.local.clear()
const serverUrl = getServerHostname()

const handle401 = (error) => {
  if(error.response.status === 401) {
    return dispatch => { 
      dispatch({ type: AUTH_INVALID })
    }
  }
}

const getCurrentSession = (originalAction) => {
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

      console.log('is new', isNew)

      if(!isNew) {
        const { selectedRecipe } = searchState
        console.log('selectedRecipe', selectedRecipe)
        console.log('the recipe', theRecipe)
        theRecipe._id = selectedRecipe._id

        const areSame = compareObjects(
          { name: theRecipe.name, tags: theRecipe.tags, config: theRecipe.config}, 
          { name: selectedRecipe.name, tags: selectedRecipe.tags, config: selectedRecipe.config}
        )

        console.log('no changes', areSame)
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
      dispatch(toggleEditing())
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
  const { row } = originalAction.payload
  return (dispatch, getState) => {
    const { results } = getState().search
    const selectedRecipe = results[row]
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
  return dispatch => {
    dispatch(loginPending())
    axios
      .post(`${serverUrl}/auth/login`, {
        ...originalAction.payload
      })
      .then(res => {
        dispatch(loginSuccess(res.data))
        dispatch(syncRecipesWithCloud())
      })
      .catch(err => {
        dispatch(loginFailure(err.message))
      })
    dispatch(getInitialResults())
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
        manager.updateRecipesFromServer(res.data)
        dispatch({ type: POPUP_SYNCRECIPES_SUCCESS })
        dispatch(getInitialResults())
      })
      .catch(err => {
        handle401(err)
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

export default {
  [TABS_SNAP]: getCurrentSession,
  [AUTH_LOGIN]: login,
  [TABS_SAVERECIPE]: saveRecipeAlias,
  [SEARCH_SETSEARCHTERMS_POPUP]: searchRecipes,
  [SEARCH_GET_INITIAL_RESULTS]: getInitialResults,
  [TABS_LAUNCHRECIPE]: launchRecipeConfiguration,
  [POPUP_OPENED]: popupSync,
  [SEARCH_SETROW]: selectRecipeFromRow,
  [TABS_DELETERECIPE]: removeRecipe
}