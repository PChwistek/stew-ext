import { createStore, applyMiddleware } from 'redux'
import { alias, wrapStore } from 'webext-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools' 
import logger from 'redux-logger'
import rootReducer from './reducers'
import aliases from './aliases'

// create aliases that are actions that only run in bg
const middleware = [alias(aliases), thunk, logger]
const composeEnhancers= composeWithDevTools({ port: 8000 })

export const initializeStore = () => {

  const enhancers = composeEnhancers(applyMiddleware(...middleware))
  const store = createStore(
    rootReducer,
    {},
    enhancers
  )

  wrapStore(store)
  
  return store
}


