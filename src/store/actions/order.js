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
        const store = getState();
        const authToken = store.auth.token;
        dispatch(purchaseBurgerStart());
        try {
            const response = await axios.post('/order.json?auth=' + authToken, orderData);
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


export const fetchOrders = (authToken) => {
    return async dispatch => {
        dispatch(fetchOrdersStart());
        try {
            const orders = await axios.get('/order.json?auth=' + authToken);
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