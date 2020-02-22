import { connect } from 'react-redux'
import CreateTab from './CreateTab'
import { 
  removeTabFromSnap, getCurrentTabs, 
  removeWindowFromSnap, setRecipeName,
  setRecipeTag, addRecipeTag, removeRecipeTag,
  clearFields, createRecipe
} from '../popup.actions'

const stateToProps = ({ tabs, popup }) => ({
  tabs,
  visible: popup.createVisible
})

const dispatchToProps = {
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

export default connect(stateToProps, dispatchToProps)(CreateTab)
