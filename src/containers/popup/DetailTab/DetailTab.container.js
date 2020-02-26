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
  createRecipe,
} from '../popup.actions'


const stateToProps = ({ search, tabs }) => ({
  selectedRecipe: search.results[search.selectedRow],
  session: tabs.session,
  tabs,
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
  createRecipe
}

export default connect(stateToProps, dispatchToProps)(DetailTab)
