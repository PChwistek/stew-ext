import { POPUP_TOGGLE_SLIDE, POPUP_TOGGLEEDITING, POPUP_SET_WINDOWID } from '../../actionTypes'

const initialState = {
  slideOutVisible: false,
  isEditing: true,
  windowId: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POPUP_TOGGLE_SLIDE:
      return Object.assign({}, state, {
        slideOutVisible: action.payload.slideOutVisible,
        isEditing: action.payload.isEditing,
      })
    case POPUP_TOGGLEEDITING:
      const invertedEditing = !state.isEditing
      return Object.assign({}, state, {
        isEditing: invertedEditing
      })
    case POPUP_SET_WINDOWID:
      return Object.assign({}, state, {
        windowId: action.payload.windowId
      })
    default:
      return state
  }
}