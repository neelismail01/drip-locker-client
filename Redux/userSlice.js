import { SET_USER_INFO, SET_USER_ADDRESS, CLEAR_USER } from './constants';

// ACTIONS
export const setUserInfo = (payload) => {
    return {
        type: SET_USER_INFO,
        payload
    }
}

export const clearUser = () => {
    return {
        type: CLEAR_USER
    }
}


// REDUCER
const initialState = {};
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                details: {
                    id: action.payload.id,
                    email: action.payload.email,
                    name: action.payload.name,
                    phone: action.payload.phone,
                    addresses: action.payload.address
                }
            }
        case CLEAR_USER:
            return state = {};
    }
    return state;
}


// SELECTOR
export const selectIsLoggedIn = (state) => Object.keys(state.userInfo).length !== 0;
export const selectUserInfo = (state) => Object.keys(state.userInfo).length !== 0 ? state.userInfo.details : '';
export const selectUserId = (state) => state.userInfo.details.id;