import { connect } from 'react-redux'
import DetailTab from './DetailTab'
import { 
  launchRecipe
} from '../popup.actions'


const stateToProps = ({ search }) => ({
  toView: search.results[search.selectedRow],
})

const dispatchToProps = {
  launchRecipe
}

export default connect(stateToProps, dispatchToProps)(DetailTab)
