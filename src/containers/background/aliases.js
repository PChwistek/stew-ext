import axios from 'axios'
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
  SEARCH_SETSEARCHTERMS,
  SEARCH_GET_INITIAL_RESULTS,
  SEARCH_SETSEARCHTERMS_POPUP,
  SEARCH_SETSEARCHTERMS_ALIAS,
 } from '../actionTypes'
import { toggleCreateView } from '../popup/popup.actions'

const manager = new TabManager()
chrome.storage.local.clear()

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

const createRecipeAlias = (originalAction) => {
  console.log('creating recipe')
  return async (dispatch, getState) => {

    try {
      dispatch(createRecipePending())
      const tabsState = getState().tabs
      const authState = getState().auth

      const reducedSession = tabsState.session.map(win => win.tabs.map(tab => ({
        favIconUrl: tab.favIconUrl, 
        url: tab.url,
        title: tab.title,
        index: tab.index
      })))

      const theRecipe = {
        uId: Math.floor(Math.random() * 101),    // returns a random integer from 0 to 100
        name: tabsState.recipeForm.recipeName,
        author: authState.loggedInAs,
        tags: tabsState.recipeForm.recipeTags,
        attributes: ['Popular', 'Favorite'],
        isPublic: tabsState.recipeForm.isPublic,
        config: reducedSession,
      }
      await manager.addRecipeToStore(theRecipe)
      dispatch(createRecipeSuccess())
      dispatch({ 
        type: TABS_CLEARFIELDS,
      })

    } catch(err) {
      console.log(err)
      dispatch(createRecipeFailed(err))
    }
    
  }

}

const createRecipeSuccess = () => {
  return {
    type: TABS_CREATERECIPE_SUCCESS,
    payload: {}
  }
}

const createRecipeFailed = () => {
  return {
    type: TABS_CREATERECIPE_FAILED,
    payload: {}
  }
}

const createRecipePending = () => {
  return {
    type: TABS_CREATERECIPE_PENDING,
    payload: {}
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
  [TABS_CREATERECIPE]: createRecipeAlias,
  [SEARCH_SETSEARCHTERMS_POPUP]: searchRecipes,
  [SEARCH_GET_INITIAL_RESULTS]: getInitialResults,
}