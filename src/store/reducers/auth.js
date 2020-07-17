import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirect: '/'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.idToken,
                userId: action.payload.localId,
                error: null,
                loading: false
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                error: action.payload.error.data.error,
                loading: false
            }
        case actionTypes.AUTH_TOAST_RESET:
            return {
                ...state,
                error: null
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                error: null,
                loading: false
            }
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirect: action.payload.path
            }
        default:
            return state;
    }
}

export default reducer;