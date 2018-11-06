import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducer'
import thunk from 'redux-thunk'

export default function configureStore() {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  )
}
