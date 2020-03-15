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
  setFavorite
} from '../popup.actions'


const stateToProps = ({ search, tabs, popup }) => ({
  favorites: search.favorites,
  selectedRecipe: search.selectedRecipe,
  session: tabs.recipeSession,
  tabs,
  isEditing: popup.isEditing
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
  setFavorite
}

export default connect(stateToProps, dispatchToProps)(DetailTab)
