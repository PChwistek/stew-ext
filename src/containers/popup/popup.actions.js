import { TABS_SNAP, TABS_REMOVETAB } from '../actionTypes'

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