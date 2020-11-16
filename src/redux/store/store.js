import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// initialize the store with the rootReducer and middleware
const store = createStore(
    rootReducer,
    storeEnhancers(
        applyMiddleware(thunk)
    )
);
export default store;