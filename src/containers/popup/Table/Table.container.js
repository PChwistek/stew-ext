import { connect } from 'react-redux'
import Table from './Table'
// import { 
// } from '../popup.actions'

const stateToProps = ({ search }) => ({
  search,
})

const dispatchToProps = {
}

export default connect(stateToProps, dispatchToProps)(Table)
