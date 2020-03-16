import { cloneDeep } from 'lodash'
import { 
  TABS_SETSNAP, TABS_REMOVETAB, TABS_REMOVEWINDOW, 
  TABS_SETRECIPEPUBLIC, TABS_SETRECIPENAME,
  TABS_ADDRECIPETAG, TABS_SETRECIPETAG, TABS_REMOVERECIPETAG, TABS_CLEARFIELDS,
  TABS_SETRECIPEFORM, TABS_RESET, TABS_SETCURRENTTAB, TABS_SETCURRENTWINDOW,
  TABS_SETSNAP_EXISTING, TABS_QUICKADD_ALIAS
} from '../../actionTypes'

const initialState = {
  recipeForm: {
    recipeName: '',
    recipeTag: '',
    recipeTags: []
  },
  session: [],
  recipeSession: [],
  isNew: false,
  currentWindow: {},
  currentTab: {}
}

export default (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case TABS_SETSNAP:
      if(state.isNew) {
        return Object.assign({}, state, {
          session: payload.session,
          recipeSession: payload.session
        })
      } 
      return Object.assign({}, state, {
        session: payload.session,
      }) 
    case TABS_REMOVETAB: {
      const { win, tab } = payload
      
      const recipeSessionCopy = [...state.recipeSession]
      const theWindow = recipeSessionCopy.find(theWin => theWin.index === win.index)
      const windowIndex = recipeSessionCopy.findIndex(theWin => theWin.index === win.index)
      theWindow.tabs = theWindow.tabs.filter(windowTab => windowTab.index !== tab.index)

      if(theWindow.tabs.length == 0) {
        recipeSessionCopy.splice(windowIndex, 1)
      }

      return Object.assign({}, state, {
        recipeSession: recipeSessionCopy,
      })
    }
    case TABS_REMOVEWINDOW: {
      const { windowToRemove } = payload

      const windowIndex = state.recipeSession.findIndex(theWin => theWin.index === windowToRemove.index)
      if(windowIndex > -1) {
        state.recipeSession.splice(windowIndex, 1)
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
    case TABS_SETCURRENTTAB:
      return Object.assign({}, state, {
        currentTab: action.payload.currentTab
      })
    case TABS_SETCURRENTWINDOW:
      return Object.assign({}, state, {
        currentWindow: action.payload.currentWindow
      })
    case TABS_SETSNAP_EXISTING:
      return Object.assign({}, state, {
        recipeSession:  cloneDeep(action.payload.session)
      })
    case TABS_QUICKADD_ALIAS:
      return Object.assign({}, state, {
        recipeForm: {
          recipeName: action.payload.recipeName,
          recipeTags: action.payload.recipeTags,
          recipeTag: ''
        },
        recipeSession: action.payload.session,
        isNew: false
      })
    case TABS_RESET:
      return initialState
    default:
      return state
  }
}