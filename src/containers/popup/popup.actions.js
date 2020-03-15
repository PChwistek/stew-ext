import { 
  TABS_SNAP, 
  TABS_REMOVETAB, 
  TABS_REMOVEWINDOW, 
  TABS_SETRECIPENAME, 
  TABS_SETRECIPEPUBLIC, 
  TABS_SETRECIPETAG, 
  TABS_ADDRECIPETAG, 
  TABS_REMOVERECIPETAG,
  TABS_LAUNCHRECIPE,
  TABS_CLEARFIELDS,
  AUTH_LOGIN,
  SEARCH_SETROW,
  SEARCH_PREVIOUSROW,
  SEARCH_NEXTROW,
  TABS_SAVERECIPE,
  POPUP_SYNCRECIPES,
  SEARCH_GET_INITIAL_RESULTS,
  SEARCH_SETSEARCHTERMS_POPUP,
  POPUP_OPENED,
  POPUP_TOGGLE_SLIDE,
  POPUP_TOGGLEEDITING,
  TABS_SETRECIPEFORM,
  TABS_DELETERECIPE,
  TABS_SETSNAP,
  AUTH_LOGOUT,
  SEARCH_SETSORTBY,
  SEARCH_SETFAVORITE
} from '../actionTypes'

export function getCurrentTabs() {
  return {
    type: TABS_SNAP,
    payload: {}
  }
}

export function getFirstResults() {
  return {
    type: SEARCH_GET_INITIAL_RESULTS,
    payload: {}
  }
}

export function launchRecipe(recipe) {
  return {
    type: TABS_LAUNCHRECIPE,
    payload: {
      recipe,
    }
  }
}

export function setSearchTerms(terms) {
  return {
    type: SEARCH_SETSEARCHTERMS_POPUP,
    payload: {
      searchTerms: terms,
    }
  }
}

export function setSortBy(selection) {
  return {
    type: SEARCH_SETSORTBY,
    payload: {
      sortedBy: selection
    }
  }
}

export function removeTabFromSnap(win, tab) {
  return {
    type: TABS_REMOVETAB,
    payload: {
      win, 
      tab
    }
  }
}

export function removeWindowFromSnap(win) {
  return {
    type: TABS_REMOVEWINDOW,
    payload: {
      windowToRemove: win
    }
  }
}

export function setRecipeName(recipeName) {
  return {
    type: TABS_SETRECIPENAME,
    payload: {
      recipeName,
    }
  }
}

export function setRecipeTag(recipeTag) {
  return {
    type: TABS_SETRECIPETAG,
    payload: {
      recipeTag,
    }
  }
}

export function addRecipeTag(recipeTag) {
  return {
    type: TABS_ADDRECIPETAG,
    payload: {
      recipeTag,
    }
  }
}

export function removeRecipeTag(recipeTag) {
  return {
    type: TABS_REMOVERECIPETAG,
    payload: {
      recipeTag,
    }
  }
}

export function setRecipePublic(isPublic) {
  return {
    type: TABS_SETRECIPEPUBLIC,
    payload: {
      isPublic,
    }
  }
}

export function clearFields() {
  return {
    type: TABS_CLEARFIELDS,
    payload: {}
  }
}

export function selectRow(rowIndex) {
  return {
    type: SEARCH_SETROW,
    payload: {
      rowIndex
    }
  }
}

export function selectNextRow() {
  return {
    type: SEARCH_NEXTROW
  }
}

export function selectPreviousRow() {
  return {
    type: SEARCH_PREVIOUSROW
  }
}

export function login(email, password) {
  return {
    type: AUTH_LOGIN,
    payload: {
      email: email.toLowerCase(),
      password,
    }
  }
}

export function logout() {
  return {
    type: AUTH_LOGOUT
  }
}

export function saveRecipe() {
  return {
    type: TABS_SAVERECIPE,
    payload: {}
  }
}

export function toggleSlide(visible, isEditing) {
  return {
    type: POPUP_TOGGLE_SLIDE,
    payload: {
      slideOutVisible: visible,
      isEditing: isEditing,
    }
  }
}

export function deleteRecipe() {
  return {
    type: TABS_DELETERECIPE,
    payload: {}
  }
}

export function syncRecipes() {
  return {
    type: POPUP_SYNCRECIPES,
    payload: {}
  }
}

export function popupOpened() {
  return {
    type: POPUP_OPENED,
    payload: {}
  }
}

export function toggleEditing(forced) {
  return {
    type: POPUP_TOGGLEEDITING,
    payload: {
      forced,
    }
  }
}

export function setRecipeSession(recipeConfig) {
  return {
    type: TABS_SETSNAP,
    payload: {
      session: recipeConfig
    }
  }
}

export function setRecipeForm(recipeName, recipeTags, isNew) {
  return {
    type: TABS_SETRECIPEFORM,
    payload: {
      recipeName,
      recipeTags,
      tag: '',
      isNew,
    }
  }
}

export function setFavorite(recipeId, value) {
  return {
    type: SEARCH_SETFAVORITE,
    payload: {
      recipeId,
      value
    }
  }
}