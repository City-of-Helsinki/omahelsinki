import {createStore} from 'redux';
import rootReducer from './reducer';

export default function configureStore(initialState = {}) {
    return createStore(
        rootReducer,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}
