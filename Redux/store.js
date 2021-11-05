import { createStore, combineReducers } from 'redux';

import { userReducer } from './userSlice';

const reducers = combineReducers({
    userInfo: userReducer,
})

const store = createStore(reducers);

export default store;