import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
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
                token: action.payload.authData.idToken,
                userId: action.payload.authData.localId,
                error: null,
                loading: false
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                error: action.payload.error.data.error,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;