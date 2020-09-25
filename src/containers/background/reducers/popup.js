import { POPUP_TOGGLE_SLIDE, POPUP_TOGGLEEDITING_ALIAS, POPUP_SET_WINDOWID } from 'Containers/actionTypes'

const initialState = {
  slideOutVisible: false,
  isEditing: false,
  windowId: '',
  installedHelp: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POPUP_TOGGLE_SLIDE:
      return Object.assign({}, state, {
        slideOutVisible: action.payload.slideOutVisible,
        isEditing: action.payload.isEditing,
      })
    case POPUP_TOGGLEEDITING_ALIAS:
      return Object.assign({}, state, {
        isEditing: action.payload.forced,
      })
    case POPUP_SET_WINDOWID:
      return Object.assign({}, state, {
        windowId: action.payload.windowId
      })
    // case POPUP_SET_HELP_INSTALLED:
    //   return Object.assign({}, state, {
    //     installedHelp: action.payload.isInstalled,
    //   })
    default:
      return state
  }
}