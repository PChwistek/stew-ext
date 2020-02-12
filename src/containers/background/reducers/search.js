import { 
  SEARCH_NEXTROW, SEARCH_PREVIOUSROW
} from '../../actionTypes'

const initialState = {
  searchTerms: '',
  results: [],
  isDropdownOpen: false,
  selectedRow: 0,
  sortedBy: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_NEXTROW:
      const nextRow = state.selectedRow + 1
      return Object.assign({}, state, {
        selectedRow: nextRow
      })
    case SEARCH_PREVIOUSROW:
      const prevRow = state.selectedRow - 1
      return Object.assign({}, state, {
        selectedRow: prevRow
      })
    default:
      return state
  }
}