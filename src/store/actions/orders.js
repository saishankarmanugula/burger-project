import * as actionTypes from './actionTypes';
import axios from '../../hoc/Axios';

export const orderClickInit = () => {
    return {
        type: actionTypes.ORDER_CLICK_INIT
    };
};

export const checkoutInit = () => {
    return {
        type: actionTypes.CHECKOUT_INIT
    };
};

export const orderSuccess = (order) => {
    return {
        type: actionTypes.ORDER_SUCCESS,
        orderData: order
    };
};

export const orderError = () => {
    return {
        type: actionTypes.ORDER_ERROR
    };
};

export const orderClickedAC = (orderData) => {
    return (dispatch) => {
        axios.post('/orders.json', orderData)
            .then(response => {
                const newOrder = {
                    id: response.data.name,
                    ...orderData
                };
                dispatch(orderSuccess(newOrder));
                // this.props.history.push({ pathname: '/' });
            })
            .catch(error => {
                dispatch(orderError());
            });
    };
};

export const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    };
};

export const fetchOrdersSuccess = (fetchedOrders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: fetchedOrders
    };
};

export const fetchOrdersError = () => {
    return {
        type: actionTypes.FETCH_ORDERS_ERROR
    };
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersInit());
        axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = [];
            for(let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key], id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
            // console.log(fetchedOrders);
        })
        .catch(err => {
            dispatch(fetchOrdersError());
        });
    };
};