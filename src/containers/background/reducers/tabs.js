import { TABS_SETSNAP, TABS_REMOVETAB, TABS_REMOVEWINDOW } from '../../actionTypes'

const initialState = {
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
    default:
      return state
  }
}