import { connect } from 'react-redux'
import Table from './Table'
import { 
  selectRow,
  launchRecipe
} from '../popup.actions'

const stateToProps = ({ search }) => ({
  search,
})

const dispatchToProps = {
  selectRow,
  launchRecipe
}

export default connect(stateToProps, dispatchToProps)(Table)
