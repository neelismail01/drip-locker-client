import { createStore, combineReducers } from 'redux';

import { cartItemsReducer } from './cartSlice';
import { userReducer } from './userSlice';

const reducers = combineReducers({
    cartItems: cartItemsReducer,
    userInfo: userReducer,
})

const store = createStore(reducers);

export default store;