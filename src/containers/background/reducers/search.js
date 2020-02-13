import { 
  SEARCH_NEXTROW, SEARCH_PREVIOUSROW
} from '../../actionTypes'

const initialState = {
  searchTerms: '',
  results: [
    {
      name: 'React Development',
      author: 'JubJubTumTum',
      tags: [
        'react',
        'webdevelopment',
        'fast'
      ],
      attributes: [
        'Popular', 
        'Favorite'
      ],
      usedBy: '1.4K',
      favorites: '400'
    },
    {
      name: 'React Development',
      author: 'JubJubTumTum',
      tags: [
        'react',
        'webdevelopment',
        'fast'
      ],
      attributes: [
        'Popular', 
        'Favorite'
      ],
      usedBy: '1.4K',
      favorites: '400'
    },
    {
      name: 'React Development',
      author: 'JubJubTumTum',
      tags: [
        'react',
        'webdevelopment',
        'fast'
      ],
      attributes: [
        'Popular', 
        'Favorite'
      ],
      usedBy: '1.4K',
      favorites: '400'
    },
    {
      name: 'React Development',
      author: 'JubJubTumTum',
      tags: [
        'react',
        'webdevelopment',
        'fast'
      ],
      attributes: [
        'Popular', 
        'Favorite'
      ],
      usedBy: '1.4K',
      favorites: '400'
    },  {
      name: 'React Development',
      author: 'JubJubTumTum',
      tags: [
        'react',
        'webdevelopment',
        'fast'
      ],
      attributes: [
        'Popular', 
        'Favorite'
      ],
      usedBy: '1.4K',
      favorites: '400'
    },
    {
      name: 'React Development',
      author: 'JubJubTumTum',
      tags: [
        'react',
        'webdevelopment',
        'fast'
      ],
      attributes: [
        'Popular', 
        'Favorite'
      ],
      usedBy: '1.4K',
      favorites: '400',
      session: {
        tabs: [
          
        ]
      }
    }
  ],
  isDropdownOpen: false,
  selectedRow: 0,
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