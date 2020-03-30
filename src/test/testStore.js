import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'Background/reducers'

// create aliases that are actions that only run in bg
const devMiddleware = [thunk]

let store = {}
const enhancers = applyMiddleware(...devMiddleware)
store = createStore(
  rootReducer,
  {},
  enhancers
)

export default store


