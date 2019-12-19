import { TABS_CURRENT } from '../actionTypes'

export function getCurrentTabs() {
  return {
    type: TABS_CURRENT,
    payload: {}
  }
}