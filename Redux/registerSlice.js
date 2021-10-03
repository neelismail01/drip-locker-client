import { SET_NAME, SET_EMAIL, SET_ADDRESS, SET_PASSWORD, CLEAR_REGISTER } from './constants';

// ACTIONS
export const setName = (payload) => {
    return {
        type: SET_NAME,
        payload
    }
}

export const setEmail = (payload) => {
    return {
        type: SET_EMAIL,
        payload
    }
}

export const setAddress = (payload) => {
    return {
        type: SET_ADDRESS,
        payload
    }
}

export const setPassword = (payload) => {
    return {
        type: SET_PASSWORD,
        payload
    }
}

export const clearRegister = () => {
    return {
        type: CLEAR_REGISTER
    }
}


// REDUCER
const initialState = [];
export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NAME:
            return {
                ...state,
                name: action.payload
            }
        case SET_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        case SET_ADDRESS:
            return {
                ...state,
                address: action.payload
            }
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case CLEAR_REGISTER:
            return state = {}
    }
    return state;
}


// SELECTOR
export const selectRegisterInfo = (state) => state.registerInfo;