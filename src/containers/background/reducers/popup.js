import { POPUP_TOGGLE_SLIDE, POPUP_TOGGLEEDITING } from '../../actionTypes'

const initialState = {
  slideOutVisible: false,
  isEditing: true,
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
    default:
      return state
  }
}