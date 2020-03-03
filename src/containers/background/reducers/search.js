import { 
  SEARCH_NEXTROW, 
  SEARCH_PREVIOUSROW, 
  SEARCH_SETROW, 
  SEARCH_SETSEARCHTERMS_ALIAS, 
  SEARCH_SETRESULTS_SUCCESS, 
  SEARCH_SELECTRECIPE, 
  SEARCH_CLEARSELECTEDRECIPE
} from '../../actionTypes'

const initialState = {
  searchTerms: '',
  results: [],
  isDropdownOpen: false,
  selectedRow: -1,
  sortedBy: '',
  selectedRecipe: {}
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
    case SEARCH_SETSEARCHTERMS_ALIAS:
      return Object.assign({}, state, {
        searchTerms: action.payload.searchTerms
      })
    case SEARCH_SETRESULTS_SUCCESS:
      return Object.assign({}, state, {
        results: action.payload.results
      })
    case SEARCH_SELECTRECIPE:
      return Object.assign({}, state, {
        selectedRecipe: action.payload.selectedRecipe
      })
    case SEARCH_CLEARSELECTEDRECIPE:
      return Object.assign({}, state, {
        selectedRecipe: {}
      })
    default:
      return state
  }
}