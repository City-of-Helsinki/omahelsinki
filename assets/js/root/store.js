import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './reducer'
import thunk from 'redux-thunk'

export default function configureStore() {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  /* eslint-enable no-underscore-dangle */

  return createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)))
}
