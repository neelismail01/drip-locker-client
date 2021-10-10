import { ADD_TO_CART, UPDATE_ITEM_QUANTITY, REMOVE_FROM_CART, CLEAR_CART } from './constants';

// ACTIONS
export const addToCart = (payload) => {
    return {
        type: ADD_TO_CART,
        payload
    }
}

export const updateItemQuantity = (payload) => {
    return {
        type: UPDATE_ITEM_QUANTITY,
        payload
    }
}

export const removeFromCart = (payload) => {
    return {
        type: REMOVE_FROM_CART,
        payload
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}


// REDUCER
const initialState = [];
export const cartItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [...state, action.payload]
        case UPDATE_ITEM_QUANTITY:
            return state.map(cartItem => {
                if (cartItem.dateAdded === action.payload.dateAdded) {
                    return {
                        ...cartItem,
                        ...action.payload
                    }
                }
                return cartItem
            })
        case REMOVE_FROM_CART:
            return state.filter(cartItem => cartItem !== action.payload)
        case CLEAR_CART:
            return state = []
    }
    return state;
}


// SELECTOR
export const selectCartItems = (state) => state.cartItems;
export const selectCartValue = (state) => state.cartItems.map(item => item.product.price * item.quantity)
                                                         .reduce((total, next) => total + next);
export const selectCartSize = (state) => state.cartItems.map(item => item.quantity)
                                                        .reduce((total, next) => total + next);