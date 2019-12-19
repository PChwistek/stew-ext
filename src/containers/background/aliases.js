import TabManager from './TabManager'
import { TABS_CURRENT, TABS_SETCURRENT } from '../actionTypes'

const manager = new TabManager()

const getCurrentsTabs = (originalAction) => {
  console.log('original action', originalAction)
  return async (dispatch) => {
    const tabs = await manager.getCurrentTabs()
    dispatch({
      type: TABS_SETCURRENT,
      payload: {
        tabs
      }
    })
  }
}

export default {
  TABS_CURRENT: getCurrentsTabs
}