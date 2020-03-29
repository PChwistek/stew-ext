import { connect } from 'react-redux'
import Popup from './Popup'
import {
  getCurrentTabs, 
  setSearchTerms, 
  getFirstResults, 
  syncRecipes, 
  toggleSlide, 
  selectRow, 
  setRecipeForm,
  toggleEditing,
  setRecipeSession,
 } from './popup.actions'

const stateToProps = ({ auth, user, popup, tabs, search }) => ({
  loggedIn: auth.loggedIn,
  user,
  ...popup,
  liveSession: tabs.session,
  terms: search.searchTerms,
})

const dispatchToProps = {
  getCurrentTabs,
  setSearchTerms,
  getFirstResults,
  syncRecipes,
  toggleSlide,
  selectRow,
  setRecipeForm,
  setRecipeSession,
  toggleEditing
}

export default connect(stateToProps, dispatchToProps)(Popup)
