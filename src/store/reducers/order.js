import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHSE_BURGER_SUCCESS:
            const newOrder = {
                ...action.payload.orderData,
                id: action.payload.orderId
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
            }
        case actionTypes.PURCHSE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.PURCHSE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default reducer;