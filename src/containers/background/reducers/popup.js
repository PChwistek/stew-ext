import { POPUP_TOGGLE_SLIDE, POPUP_SELECTROW } from '../../actionTypes'

const initialState = {
  slideOutVisible: false,
  isEditing: true,
  selectedRow: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POPUP_TOGGLE_SLIDE:
      return Object.assign({}, state, {
        slideOutVisible: action.payload.slideOutVisible,
        isEditing: action.payload.isEditing,
      })
    case POPUP_SELECTROW:
      return Object.assign({}, state, {
        selectedRow: action.payload.selectedRow
      })
    default:
      return state
  }
}