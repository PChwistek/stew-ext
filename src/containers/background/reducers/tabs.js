import { 
  TABS_SETSNAP, TABS_REMOVETAB, TABS_REMOVEWINDOW, 
  TABS_SETRECIPEPUBLIC, TABS_SETRECIPENAME,
  TABS_ADDRECIPETAG, TABS_SETRECIPETAG, TABS_REMOVERECIPETAG, TABS_CLEARFIELDS,
  TABS_SETRECIPEFORM, TABS_RESET
} from '../../actionTypes'

const initialState = {
  recipeForm: {
    recipeName: '',
    recipeTag: '',
    recipeTags: []
  },
  session: [],
  isNew: true,
}

export default (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case TABS_SETSNAP: 
      return Object.assign({}, state, {
        session: payload.session
      })
    case TABS_REMOVETAB: {
      const { win, tab } = payload
      
      const theWindow = state.session.find(theWin => theWin.index === win.index)
      const windowIndex = state.session.findIndex(theWin => theWin.index === win.index)
      const newTabs = theWindow.tabs.filter(windowTab => windowTab.index !== tab.index)
      theWindow.tabs = newTabs

      if(theWindow.tabs.length == 0) {
        state.session.splice(windowIndex, 1)
      }
      return Object.assign({}, state, {})
    }
    case TABS_REMOVEWINDOW: {
      const { windowToRemove } = payload

      const windowIndex = state.session.findIndex(theWin => theWin.index === windowToRemove.index)
      if(windowIndex > -1) {
        state.session.splice(windowIndex, 1)
      }
      return Object.assign({}, state, {})
    }
    case TABS_SETRECIPENAME:
      const { recipeName } = payload
      state.recipeForm.recipeName = recipeName
      return Object.assign({}, state, {} )
    case TABS_SETRECIPEPUBLIC: 
      const { isPublic } = payload
      state.recipeForm.isPublic = isPublic
      return Object.assign({}, state, {} )
    case TABS_SETRECIPETAG:
      const { recipeTag } = payload
      state.recipeForm.recipeTag = recipeTag
      return Object.assign({}, state, {} )
    case TABS_ADDRECIPETAG: {
      const theTag = state.recipeForm.recipeTag
      state.recipeForm.recipeTags.push(theTag)
      state.recipeForm = {
        ...state.recipeForm,
        recipeTag: ''
      }
      return Object.assign({}, state, {} )
    }
    case TABS_REMOVERECIPETAG: {
      const { recipeTag } = payload
      state.recipeForm.recipeTags = state.recipeForm.recipeTags.filter(tag => tag !== recipeTag)
      return Object.assign({}, state, {})
    }
    case TABS_CLEARFIELDS: 
      return Object.assign({}, state, {
        recipeForm: {
          recipeName: '',
          recipeTag: '',
          recipeTags: [],
        }
      })
    case TABS_SETRECIPEFORM:
      return Object.assign({}, state, {
        recipeForm: {
          recipeName: action.payload.recipeName,
          recipeTags: action.payload.recipeTags,
          recipeTag: ''
        },
        isNew: action.payload.isNew,
      })
    case TABS_RESET:
      return initialState
    default:
      return state
  }
}