import { connect } from 'react-redux'
import CreateTab from './CreateTab'
import { removeTabFromSnap, getCurrentTabs, 
  removeWindowFromSnap, setRecipeName, setRecipePublic, setRecipeTag, addRecipeTag, removeRecipeTag } from '../popup.actions'

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
}

export default connect(stateToProps, dispatchToProps)(CreateTab)
