import { createStore, combineReducers } from 'redux';

import { userReducer } from './userSlice';
import { postReducer } from './postSlice';

const reducers = combineReducers({
    userInfo: userReducer,
    postInfo: postReducer
})

const store = createStore(reducers);

export default store;