import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// redux-persist
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const config = { key: 'root', storage: AsyncStorage, debug: true };

import { products } from './products';
import { carts } from './carts';
import { members } from './members';

export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, { products, carts, members }),
        applyMiddleware(thunk, logger)
    );
    const persistor = persistStore(store);
  return { persistor, store };
}