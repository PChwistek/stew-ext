import { TABS_SNAP, TABS_REMOVETAB, TABS_REMOVEWINDOW, 
  TABS_SETRECIPENAME, TABS_SETRECIPEPUBLIC } from '../actionTypes'

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

export function setRecipePublic(isPublic) {
  return {
    type: TABS_SETRECIPEPUBLIC,
    payload: {
      isPublic,
    }
  }
}