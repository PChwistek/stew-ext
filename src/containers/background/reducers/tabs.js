import { TABS_SETSNAP } from '../../actionTypes'

const initialState = {
}


export default (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case TABS_SETSNAP:
      return Object.assign({}, state, {
        session: payload.session
      })
    default:
      return state
  }
}