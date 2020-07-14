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

export const fetchOrdersSucccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: {
            orders: orders
        }
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        payload: {
            error: error
        }
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT,
    }
}


export const fetchOrders = () => {
    return async dispatch => {
        dispatch(fetchOrdersStart());
        try {
            const orders = await axios.get('https://burger-builder-8b7b4.firebaseio.com/order.json');
            const fetchData = [];
            for (let key in orders.data) {
                fetchData.push({
                    ...orders.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSucccess(fetchData));
        } catch (err) {
            dispatch(fetchOrdersFailed(err));
        }
    }
}