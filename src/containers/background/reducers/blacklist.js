import { BLACKLIST } from '../../actionTypes'


const initialState = {
  blacklist: {},
  blocking: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case BLACKLIST.SET:
      return Object.assign(
        {},
        state,
        { 
          blacklist: action.blacklist
        }
      )
    case BLACKLIST.START:
      return Object.assign(
        {},
        state,
        {
          blocking: true
        }
      )
    case BLACKLIST.STOP:
      return Object.assign(
        {},
        state,
        {
          blocking: false
        }
      )
    default:
      return state
  }
}