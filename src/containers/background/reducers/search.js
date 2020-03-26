import { 
  SEARCH_NEXTROW, 
  SEARCH_PREVIOUSROW, 
  SEARCH_SETROW_ALIAS, 
  SEARCH_SETSEARCHTERMS_ALIAS, 
  SEARCH_SETRESULTS_SUCCESS, 
  SEARCH_SELECTRECIPE, 
  SEARCH_CLEARSELECTEDRECIPE,
  SEARCH_RESET,
  SEARCH_SETSORTBY_ALIAS,
  SEARCH_SETFAVORITE_ALIAS
} from '../../actionTypes'

const initialState = {
  searchTerms: '',
  results: [],
  isDropdownOpen: false,
  selectedRow: 0,
  sortedBy: 'all',
  selectedRecipe: {},
  favorites: []
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
        selectedRow: 0,
        searchTerms: action.payload.searchTerms
      })
    case SEARCH_SETRESULTS_SUCCESS:
      return Object.assign({}, state, {
        results: action.payload.results
      })
    case SEARCH_SELECTRECIPE:
      return Object.assign({}, state, {
        selectedRecipe: action.payload.selectedRecipe,
      })
    case SEARCH_CLEARSELECTEDRECIPE:
      return Object.assign({}, state, {
        selectedRecipe: {}
      })
    case SEARCH_SETROW_ALIAS: {
      return Object.assign({}, state, {
        selectedRow: action.payload.selectedRow
      })
    }
    case SEARCH_SETSORTBY_ALIAS: {
      return Object.assign({}, state, {
        selectedRow: 0,
        sortedBy: action.payload.sortedBy
      })
    }
    case SEARCH_SETFAVORITE_ALIAS: {
      return Object.assign({}, state, {
        favorites: action.payload.favs
      })
    }
    case SEARCH_RESET:
      return initialState
    default:
      return state
  }
}