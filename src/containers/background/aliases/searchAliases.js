import axios from 'axios'
import getServerHostname from 'Containers/getServerHostName'

import { 
  SEARCH_SETRESULTS_SUCCESS,
  SEARCH_SETROW_ALIAS,
  SEARCH_SELECTRECIPE,
  SEARCH_SETSEARCHTERMS_ALIAS,
  SEARCH_SETSORTBY_ALIAS,
  SEARCH_SETFAVORITE_SYNC_SUCCESS,
  SEARCH_SETFAVORITE_ALIAS,
} from 'Containers/actionTypes'

import { defaultManager as manager } from '../tabmanager'

const serverUrl = getServerHostname()

export const getInitialResults = (originalAction) => {
  return async (dispatch, getState) => {
    const { search: { sortedBy, favorites, repos } } = getState()
    let recipes = await manager.fetchAllRecipes()
    let repoIndex = repos.findIndex(repo => repo.repoId === sortedBy)
    if (sortedBy == 'favorites') {
      recipes = recipes.filter(recipe => favorites.findIndex(fav => fav == recipe._id) > -1)
    } else if (repoIndex > -1) {
      recipes = recipes.filter(recipe => repos[repoIndex].recipes.findIndex(repoRecipe => repoRecipe == recipe._id) > -1) 
    }
    dispatch(searchSuccess(recipes))
  }
}

export const searchSuccess = (results) => {
  return {
    type: SEARCH_SETRESULTS_SUCCESS,
    payload: {
      results
    }
  }
}

export const setSearchRowAlias = (rowIndex) => {
  return {
    type: SEARCH_SETROW_ALIAS, 
    payload: {
      selectedRow: rowIndex
    } 
  }
}

export const searchRecipes = (originalAction) => {
  return async (dispatch, getState) => {
    const { search: { sortedBy, favorites, repos } } = getState()
    dispatch(setSearchTerms(originalAction))
    
    let filteredList = []
    let repoIndex = repos.findIndex(repo => repo.id === sortedBy)
    if (sortedBy === 'favorites') {
      filteredList = favorites
    } else if (repoIndex > -1) {
      filteredList = repos[repoIndex].recipes
    }
    const recipes = await manager.searchRecipes(originalAction.payload.searchTerms, { sortedBy, filteredList })
    dispatch(searchSuccess(recipes))
  }
}

export const setSearchTerms = (originalAction) => {
  return {
    type: SEARCH_SETSEARCHTERMS_ALIAS,
    payload: {
      searchTerms: originalAction.payload.searchTerms
    }
  }
}

export const sortBySearch = (originalAction) => {
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

export const selectRecipe = (selectedRecipe) => {
  return {
    type: SEARCH_SELECTRECIPE,
    payload: {
      selectedRecipe,
    }
  }
}

export const setFavoriteAlias = (originalAction) => {
  return (dispatch, getState) => {
    const { value, recipeId } = originalAction.payload
    let tempFavs = getState().search.favorites
    if(value) {
      tempFavs.push(recipeId)
    } else {
      tempFavs = tempFavs.filter(recipe => recipe == value)
    }
    dispatch({
      type: SEARCH_SETFAVORITE_ALIAS,
      payload: {
        favs: tempFavs
      }
    })

    // to server
    const authState = getState().auth
    const { jwt } = authState
    const config = {
      headers: { Authorization: `Bearer ${jwt}` }
    }

    axios
    .post(`${serverUrl}/recipe/favorite`, { recipeId, isNew: value }, config)
    .then(() => {
      dispatch({ type: SEARCH_SETFAVORITE_SYNC_SUCCESS})
    })
    .catch(err => {
      dispatch(handle401(err))
      dispatch({ type: SEARCH_SETFAVORITE_SYNC_FAILED })
    })

  }
 
}