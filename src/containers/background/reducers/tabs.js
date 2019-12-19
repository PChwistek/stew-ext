import { TABS_SETCURRENT } from '../../actionTypes'

const initialState = {
}


export default (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case TABS_SETCURRENT:
      return Object.assign({}, state, {
        currentTabs: payload.tabs
      })
    default:
      return state
  }
}