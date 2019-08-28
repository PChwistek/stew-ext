import { SESSION } from '../../actionTypes'


const initialState = {
  active: false,
  settings: {},
  activeDevices: {},
  distractions: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SESSION.START:
      return Object.assign(
        {},
        state,
        { 
          active: true
        }
      )
    case SESSION.STOP:
      return Object.assign(
        {},
        state,
        {
          active: false
        }
      )
    case SESSION.ADD_DEVICE:
      return state
    case SESSION.REMOVE_DEVICE:
      return state
    case SESSION.NOTE_DISTRACTION:
      return state
    default:
      return state
  }
}