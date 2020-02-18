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
 } from '../actionTypes'

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
        name: tabsState.recipeForm.recipeName,
        author: authState.loggedInAs,
        tags: tabsState.recipeForm.recipeTags,
        isPublic: tabsState.recipeForm.isPublic,
        config: reducedSession,
      }
      await manager.addRecipeToStore(theRecipe)
      dispatch(createRecipeSuccess())
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
    await manager.searchRecipes(originalAction.payload.searchTerms)
    dispatch(searchSuccess())
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
  [SEARCH_SETSEARCHTERMS]: searchRecipes,
}