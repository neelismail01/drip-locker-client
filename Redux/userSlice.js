import { SET_USER_INFO, SET_USER_ADDRESSES, CLEAR_USER } from './constants';

// ACTIONS
export const setUserInfo = (payload) => {
    return {
        type: SET_USER_INFO,
        payload
    }
}

export const setUserAddresses = (payload) => {
    return {
        type: SET_USER_ADDRESSES,
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
                id: action.payload.id,
                email: action.payload.email,
                name: action.payload.name,
                addresses: action.payload.address
            }
        case SET_USER_ADDRESSES:
            return {
                ...state,
                addresses: action.payload.address
            }
        case CLEAR_USER:
            return state = {};
    }
    return state;
}


// SELECTOR
export const selectIsLoggedIn = (state) => Object.keys(state.userInfo).length !== 0;
export const selectUserInfo = (state) => state.userInfo;
export const selectUserId = (state) => state.userInfo.id;
export const selectUserAddresses = (state) => state.userInfo.addresses;