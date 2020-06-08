import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
/*
https://github.com/zalmoxisus/redux-devtools-extension#usage
 */

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore (initState = {}) {
    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            }) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(thunk),
    );

    let store = createStore(persistedReducer, enhancer);
    let persistor = persistStore(store);
    return { store, persistor }
}