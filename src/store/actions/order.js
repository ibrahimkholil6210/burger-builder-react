import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBugerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHSE_BURGER_SUCCESS,
        payload: {
            orderId: id,
            orderData: orderData
        }
    }
}

export const purchaseBugerFailed = (error) => {
    return {
        type: actionTypes.PURCHSE_BURGER_FAIL,
        payload: {
            error
        }
    }
}

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHSE_BURGER_START
    }
}


export const purchaseBurger = (orderData) => {
    return async (dispatch, getState) => {
        dispatch(purchaseBurgerStart());
        try {
            const response = await axios.post('/order.json', orderData);
            dispatch(purchaseBugerSuccess(response.data.name, orderData))
        } catch (err) {
            dispatch(purchaseBugerFailed(err))
        }
    }
}

export const purchseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}