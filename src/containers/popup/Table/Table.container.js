import { connect } from 'react-redux'
import Table from './Table'
import { 
  selectRow,
  launchRecipe,
  selectNextRow,
  selectPreviousRow
} from '../popup.actions'

const stateToProps = ({ search, popup }) => ({
  search,
  ...popup,
})

const dispatchToProps = {
  selectRow,
  launchRecipe,
  selectNextRow,
  selectPreviousRow,
}

export default connect(stateToProps, dispatchToProps)(Table)
