import { POPUP_TOGGLE_DETAILVISIBLE, POPUP_SELECTROW, POPUP_TOGGLE_CREATEVISIBLE } from '../../actionTypes'

const initialState = {
  createVisible: false,
  detailVisible: false,
  detailWasOpened: false,
  createWasOpened: false,
  selectedRow: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POPUP_TOGGLE_CREATEVISIBLE:
      return Object.assign({}, state, {
        createVisible: action.payload.createVisible,
        createWasOpened: action.payload.createWasOpened
      })
    case POPUP_TOGGLE_DETAILVISIBLE:
      return Object.assign({}, state, {
        detailVisible: action.payload.detailVisible,
        detailWasOpened: action.payload.detailWasOpened,
        selectedRow: action.payload.selectedRow
      })
    case POPUP_SELECTROW:
      return Object.assign({}, state, {
        selectedRow: action.payload.selectedRow
      })
    default:
      return state
  }
}