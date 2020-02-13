import { 
  SEARCH_NEXTROW, SEARCH_PREVIOUSROW, SEARCH_SETROW
} from '../../actionTypes'

const initialState = {
  searchTerms: '',
  results: [],
  isDropdownOpen: false,
  selectedRow: -1,
  sortedBy: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_NEXTROW:
      let nextRow = state.selectedRow
      if(nextRow + 1 < state.results.length) {
        nextRow += 1
      }
      return Object.assign({}, state, {
        selectedRow: nextRow
      })
    case SEARCH_SETROW:
      const { row } = action.payload
      return Object.assign({}, state, {
        selectedRow: row,
      })
    case SEARCH_PREVIOUSROW:
      let prevRow = state.selectedRow - 1
      if(prevRow < 0) {
        prevRow += 1
      }
      return Object.assign({}, state, {
        selectedRow: prevRow
      })
    default:
      return state
  }
}