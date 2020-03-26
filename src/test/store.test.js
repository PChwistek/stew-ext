import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools' 
import logger from 'redux-logger'
import rootReducer from '../containers/background/reducers'

// create aliases that are actions that only run in bg
const devMiddleware = [thunk, logger]

let store = {}
const composeEnhancers= composeWithDevTools({ port: 6888, realtime: true })
const enhancers = composeEnhancers(applyMiddleware(...devMiddleware))
store = createStore(
  rootReducer,
  {},
  enhancers
)

export default store


