import { connect } from 'react-redux'
import CreateTab from './CreateTab'
import { 
  removeTabFromSnap, getCurrentTabs, 
  removeWindowFromSnap, setRecipeName, setRecipePublic,
  setRecipeTag, addRecipeTag, removeRecipeTag,
  clearFields, createRecipe
} from '../popup.actions'

const stateToProps = ({ tabs }) => ({
  tabs,
})

const dispatchToProps = {
  removeTabFromSnap,
  getCurrentTabs,
  removeWindowFromSnap,
  setRecipeName,
  setRecipePublic,
  setRecipeTag,
  addRecipeTag,
  removeRecipeTag,
  clearFields,
  createRecipe
}

export default connect(stateToProps, dispatchToProps)(CreateTab)
