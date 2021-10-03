import { createStore, combineReducers } from 'redux';

import { cartItemsReducer } from './cartSlice';
import { userReducer } from './userSlice';
import { registerReducer } from './registerSlice';

const reducers = combineReducers({
    cartItems: cartItemsReducer,
    userInfo: userReducer,
    registerInfo: registerReducer
})

const store = createStore(reducers);

export default store;