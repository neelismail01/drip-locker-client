import { createStore, combineReducers } from 'redux';

import { cartItemsReducer } from './cartSlice';
import { userReducer } from './userSlice';
import { orderDetailsReducer } from './orderDetailsSlice';

const reducers = combineReducers({
    cartItems: cartItemsReducer,
    userDetails: userReducer,
    orderDetails: orderDetailsReducer,
})

const store = createStore(reducers);

export default store;