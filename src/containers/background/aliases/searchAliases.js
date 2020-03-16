import { 
  SEARCH_SETRESULTS_SUCCESS,
  SEARCH_SETROW_ALIAS,
  SEARCH_SELECTRECIPE,
  SEARCH_SETSEARCHTERMS_ALIAS,
  SEARCH_SETSORTBY_ALIAS,
} from '../../actionTypes'

import manager from '../TabManager'

export const getInitialResults = (originalAction) => {
  return async (dispatch, getState) => {
    const { search: { sortedBy, favorites } } = getState()
    let recipes = await manager.fetchAllRecipes()
    if(sortedBy == 'favorites') {
      recipes = recipes.filter(recipe => favorites.findIndex(fav => fav == recipe._id) > -1)
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
    const { search: { sortedBy, favorites } } = getState()
    dispatch(setSearchTerms(originalAction))
    const recipes = await manager.searchRecipes(originalAction.payload.searchTerms, { sortedBy, filterList: favorites })
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