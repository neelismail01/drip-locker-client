import { SET_POST_PICTURES, SET_BRAND_DETAILS, SET_POST_CAPTION, SET_PRODUCT_TAGS, CLEAR_POST } from './constants';

// ACTIONS
export const setPostPictures = (payload) => {
    return {
        type: SET_POST_PICTURES,
        payload
    }
}

export const setBrandDetails = (payload) => {
    return {
        type: SET_BRAND_DETAILS,
        payload
    }
}


export const setPostCaption = (payload) => {
    return {
        type: SET_POST_CAPTION,
        payload
    }
}

export const setProductTags = (payload) => {
    return {
        type: SET_PRODUCT_TAGS,
        payload
    }
}

export const clearPost = () => {
    return {
        type: CLEAR_POST
    }
}


// REDUCER
const initialState = {
    pictures: [],
    productTags: [],
    brandName: '',
    brandWebsite: '',
    brandLogo: '',
    caption: ''
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POST_PICTURES:
            return {
                ...state,
                pictures: action.payload
            }
        case SET_BRAND_DETAILS:
            return {
                ...state,
                brandName: action.payload.brandName,
                brandLogo: action.payload.brandLogo,
                brandWebsite: action.payload.brandWebsite
            }
        case SET_PRODUCT_TAGS:
            return {
                ...state,
                productTags: action.payload
            }
        case SET_POST_CAPTION:
            return {
                ...state,
                caption: action.payload
            }
        case CLEAR_POST:
            return state = initialState;
    }
    return state;
}


// SELECTOR
export const selectPostInfo = (state) => state.postInfo;