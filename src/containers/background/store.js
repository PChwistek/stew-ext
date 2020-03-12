import { createStore, applyMiddleware } from 'redux'
import { alias, wrapStore } from 'webext-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools' 
import logger from 'redux-logger'
import rootReducer from './reducers'
import aliases from './aliases'

// create aliases that are actions that only run in bg
const devMiddleware = [alias(aliases), thunk, logger]
const prodMiddleware = [alias(aliases), thunk]
const isProd = process.env.NODE_ENV === 'production'

let store = {}
if(!isProd) {
  const composeEnhancers= composeWithDevTools({ port: 7888, realtime: true })
  const enhancers = composeEnhancers(applyMiddleware(...devMiddleware))
  store = createStore(
    rootReducer,
    {},
    enhancers
  )
} else {
  store = createStore(
    rootReducer,
    {},
    applyMiddleware(...prodMiddleware)
  )
}

wrapStore(store)

export default store


