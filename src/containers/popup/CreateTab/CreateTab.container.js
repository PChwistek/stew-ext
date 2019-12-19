import { connect } from 'react-redux'
import CreateTab from './CreateTab'

const stateToProps = ({ tabs }) => ({
  tabs,
})

const dispatchToProps = {
}

export default connect(stateToProps, dispatchToProps)(CreateTab)
