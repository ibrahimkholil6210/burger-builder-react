import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
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
                orders: state.orders.concat(newOrder),
                purchased: true
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
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        default:
            return state;
    }
}

export default reducer;