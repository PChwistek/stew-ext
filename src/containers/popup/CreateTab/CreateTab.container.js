import { connect } from 'react-redux'
import CreateTab from './CreateTab'
import { removeTabFromSnap, getCurrentTabs, 
  removeWindowFromSnap, setRecipeName, setRecipePublic } from '../popup.actions'

const stateToProps = ({ tabs }) => ({
  tabs,
})

const dispatchToProps = {
  removeTabFromSnap,
  getCurrentTabs,
  removeWindowFromSnap,
  setRecipeName,
  setRecipePublic
}

export default connect(stateToProps, dispatchToProps)(CreateTab)
