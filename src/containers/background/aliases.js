import TabManager from './TabManager'
import { TABS_SNAP, TABS_SETSNAP } from '../actionTypes'

const manager = new TabManager()

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

export default {
  [TABS_SNAP]: getCurrentSession
}