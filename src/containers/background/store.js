import { createStore, applyMiddleware } from 'redux'
import { wrapStore } from 'webext-redux'
import { composeWithDevTools } from 'remote-redux-devtools' 
import logger from 'redux-logger'
import rootReducer from './reducers'

// create aliases that are actions that only run in bg
const middleware = [logger]
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


