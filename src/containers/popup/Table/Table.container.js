import { connect } from 'react-redux'
import Table from './Table'
import { 
  selectRow
} from '../popup.actions'

const stateToProps = ({ search }) => ({
  search,
})

const dispatchToProps = {
  selectRow
}

export default connect(stateToProps, dispatchToProps)(Table)
