import { SET_ACCESS_TOKEN, SET_USER_INFO, CLEAR_USER } from './constants';

// ACTIONS
export const setAccessToken = (payload) => {
    return {
        type: SET_ACCESS_TOKEN,
        payload
    }
}


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
const initialState = {
    accessToken: '',
    id: '',
    name: '',
    email: ''
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload
            }
        case SET_USER_INFO:
            return {
                ...state,
                id: action.payload._id,
                name: action.payload.name,
                email: action.payload.email
            }
        case CLEAR_USER:
            return state = initialState;
    }
    return state;
}


// SELECTOR
export const selectIsLoggedIn = (state) => state.userInfo.accessToken.length > 0;
export const selectAccessToken = (state) => state.userInfo.accessToken;
export const selectUserInfo = (state) => state.userInfo;
export const selectUserId = (state) => state.userInfo.id;