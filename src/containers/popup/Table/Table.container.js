import { connect } from 'react-redux'
import Table from './Table'
import { 
  selectRow,
  launchRecipe,
  selectNextRow,
  selectPreviousRow,
  setSortBy
} from '../popup.actions'

const stateToProps = ({ auth, search, popup }) => ({
  loggedIn: auth.loggedIn,
  search,
  ...popup,
})

const dispatchToProps = {
  selectRow,
  launchRecipe,
  selectNextRow,
  selectPreviousRow,
  setSortBy
}

export default connect(stateToProps, dispatchToProps)(Table)
