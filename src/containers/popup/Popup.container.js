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
  setRecipeSession,
  toggleEditing
 } from './popup.actions'

const stateToProps = ({ auth, user, popup, search }) => ({
  loggedIn: auth.loggedIn,
  user,
  ...popup,
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
