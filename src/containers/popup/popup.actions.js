import { TABS_SNAP, TABS_REMOVETAB, TABS_REMOVEWINDOW, 
  TABS_SETRECIPENAME, TABS_SETRECIPEPUBLIC, TABS_SETRECIPETAG, TABS_ADDRECIPETAG, TABS_REMOVERECIPETAG } from '../actionTypes'

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