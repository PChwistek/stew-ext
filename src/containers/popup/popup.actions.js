import { 
  TABS_SNAP, 
  TABS_REMOVETAB, 
  TABS_REMOVEWINDOW, 
  TABS_SETRECIPENAME, 
  TABS_SETRECIPEPUBLIC, 
  TABS_SETRECIPETAG, 
  TABS_ADDRECIPETAG, 
  TABS_REMOVERECIPETAG, 
  TABS_CLEARFIELDS,
  SEARCH_NEXTROW,
  SEARCH_PREVIOUSROW,
  AUTH_LOGIN,
  SEARCH_SETROW,
  TABS_CREATERECIPE,
  POPUP_SELECTROW,
  POPUP_TOGGLE_DETAILVISIBLE,
  POPUP_TOGGLE_CREATEVISIBLE
} from '../actionTypes'

export function getCurrentTabs() {
  return {
    type: TABS_SNAP,
    payload: {}
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

export function nextRow() {
  return {
    type: SEARCH_NEXTROW,
    payload: {}
  }
}

export function selectRow(row) {
  return {
    type: SEARCH_SETROW,
    payload: {
      row
    }
  }
}

export function previousRow() {
  return {
    type: SEARCH_PREVIOUSROW,
    payload: {}
  }
}

export function login(username, password) {
  return {
    type: AUTH_LOGIN,
    payload: {
      username,
      password,
    }
  }
}

export function createRecipe() {
  return {
    type: TABS_CREATERECIPE,
    payload: {}
  }
}

export function popupSelectRow(row) {
  return {
    type: POPUP_SELECTROW,
    payload: {
      selectedRow: row,
    }
  }
}

export function toggleCreateView(visible) {
  return {
    type: POPUP_TOGGLE_CREATEVISIBLE,
    payload: {
      createVisible: visible,
      createWasOpened: !visible
    }
  }
}

export function toggleDetailView(visible, opened, row) {
  return {
    type: POPUP_TOGGLE_DETAILVISIBLE,
    payload: {
      detailVisible: visible,
      detailWasOpened: opened,
      selectedRow: row,
    }
  }
}