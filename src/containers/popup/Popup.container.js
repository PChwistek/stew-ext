import { connect } from 'react-redux'
import Popup from './Popup'
import {
  getCurrentTabs, 
  toggleCreateView, 
  toggleDetailView, 
  setSearchTerms, 
  getFirstResults, 
  syncRecipes, 
  toggleSlide, 
  selectRow, 
  popupOpened,
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
  toggleCreateView,
  toggleDetailView,
  setSearchTerms,
  getFirstResults,
  syncRecipes,
  toggleSlide,
  selectRow,
  popupOpened,
  setRecipeForm,
  setRecipeSession,
  toggleEditing
}

export default connect(stateToProps, dispatchToProps)(Popup)
