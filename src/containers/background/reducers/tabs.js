import { 
  TABS_SETSNAP, TABS_REMOVETAB, TABS_REMOVEWINDOW, 
  TABS_SETRECIPEPUBLIC, TABS_SETRECIPENAME,
  TABS_ADDRECIPETAG, TABS_SETRECIPETAG, TABS_REMOVERECIPETAG, TABS_CLEARFIELDS,
  TABS_CREATERECIPE
} from '../../actionTypes'

const initialState = {
  recipeForm: {
    recipeName: '',
    recipeTag: '',
    recipeTags: [],
    isPublic: false,
  }
}

/*
  this is ugly, I'm modifying the state variable directly, should be handled more functionally
*/

export default (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case TABS_SETSNAP: 
      return Object.assign({}, state, {
        session: payload.session
      })
    case TABS_REMOVETAB: {
      const { win, tab } = payload
      
      const theWindow = state.session.find(theWin => theWin.id === win.id)
      const windowIndex = state.session.findIndex(theWin => theWin.id === win.id)
      const newTabs = theWindow.tabs.filter(windowTab => windowTab.id !== tab.id)
      theWindow.tabs = newTabs

      if(theWindow.tabs.length == 0) {
        console.log('here!')
        state.session.splice(windowIndex, 1)
      }
      return Object.assign({}, state, {})
    }
    case TABS_REMOVEWINDOW: {
      const { windowToRemove } = payload

      const windowIndex = state.session.findIndex(theWin => theWin.id === windowToRemove.id)
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
      state.recipeForm.recipeTags.push({
        id: state.recipeForm.recipeTags.length,
        text: theTag
      })
      state.recipeForm = {
        ...state.recipeForm,
        recipeTag: ''
      }
      return Object.assign({}, state, {} )
    }
    case TABS_REMOVERECIPETAG: {
      const { recipeTag } = payload
      const tagId = recipeTag.id
      state.recipeForm.recipeTags = state.recipeForm.recipeTags.filter(tag => tag.id != tagId)
      return Object.assign({}, state, {})
    }
    case TABS_CLEARFIELDS: 
      return Object.assign({}, state, {
        recipeForm: {
          recipeName: '',
          recipeTag: '',
          recipeTags: [],
          isPublic: false,
        }
      })
    default:
      return state
  }
}