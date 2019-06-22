import {Store, applyMiddleware} from 'webext-redux'

// Proxy store
const store = new Store()

// Apply middleware to proxy store
const middleware = []
const storeWithMiddleware = applyMiddleware(store, ...middleware)

export default storeWithMiddleware