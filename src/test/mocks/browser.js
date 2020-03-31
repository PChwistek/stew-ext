import { currentSession } from '../stories/testSearchState'

let test_stew_auth = {}
let test_stew = {}

const mockStorageGet = jest.fn( path => {
  if(path === 'test_stew_auth') {
    return test_stew_auth
  } else if (path === 'test_stew') {
    return test_stew
  }
})

const mockStorageSet = jest.fn(someObject => {
  if (Object.keys(someObject)[0] === 'test_stew_auth') {
    test_stew_auth = {
      ...someObject
    }
  } else if (Object.keys(someObject)[0] === 'test_stew') {
    test_stew = {
      ...someObject
    }
  }
})

const mockTabsQuery = jest.fn(someQuery => {
  if (Object.keys(someQuery)[0] === 'windowId') {
    return currentSession.windows[0].tabs
  }
})

const mockGetAllWindows = jest.fn(() => {
  return currentSession.windows
})

const browser = {
  storage: {
    local: {
      get: mockStorageGet,
      set: mockStorageSet
    },
  },
  tabs: {
    query: mockTabsQuery
  },
  windows: {
    getAll: mockGetAllWindows
  }
}

export default browser