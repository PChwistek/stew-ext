import { connect } from 'react-redux'
import Popup from './Popup'
import { getCurrentTabs, toggleCreateView, toggleDetailView, setSearchTerms, getFirstResults } from './popup.actions'
import search from '../background/reducers/search'

const stateToProps = ({ auth, user, popup, search }) => ({
  loggedIn: auth.loggedIn,
  user,
  ...popup,
  terms: search.searchTerms,
})

const dispatchToProps = {
  getCurrentTabs,
  toggleCreateView,
  toggleDetailView,
  setSearchTerms,
  getFirstResults
}

export default connect(stateToProps, dispatchToProps)(Popup)
