import { connect } from 'react-redux'
import DetailTab from './DetailTab'

import {
  launchRecipe,
  removeTabFromSnap, 
  getCurrentTabs, 
  removeWindowFromSnap, 
  setRecipeName,
  setRecipeTag, 
  addRecipeTag, 
  removeRecipeTag,
  clearFields, 
  saveRecipe,
  toggleEditing,
  setRecipeForm,
  setRecipeSession,
  deleteRecipe,
  setFavorite,
  quickAdd,
  mergeSession,
  moveTab,
  setPermissions,
} from 'Popup/popup.actions'


const stateToProps = ({ search, tabs, popup, auth }) => ({
  userId: auth.userId,
  favorites: search.favorites,
  selectedRecipe: search.selectedRecipe,
  session: tabs.recipeSession,
  tabs,
  liveSession: tabs.session,
  currentTab: tabs.currentTab,
  isEditing: popup.isEditing,
  settings: auth.settings,
})

const dispatchToProps = {
  launchRecipe,
  removeTabFromSnap,
  getCurrentTabs,
  removeWindowFromSnap,
  setRecipeName,
  setRecipeTag,
  addRecipeTag,
  removeRecipeTag,
  clearFields,
  saveRecipe,
  toggleEditing,
  setRecipeForm,
  setRecipeSession,
  deleteRecipe,
  setFavorite,
  quickAdd,
  mergeSession,
  moveTab,
  setPermissions,
}

export default connect(stateToProps, dispatchToProps)(DetailTab)
