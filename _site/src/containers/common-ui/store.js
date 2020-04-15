import {Store, applyMiddleware} from 'webext-redux'
import thunk from 'redux-thunk'

// Proxy store
const store = new Store()

// Apply middleware to proxy store
const middleware = [thunk]
const storeWithMiddleware = applyMiddleware(store, ...middleware)

export default storeWithMiddleware