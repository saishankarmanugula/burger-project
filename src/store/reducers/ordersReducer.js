import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
 
const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHECKOUT_INIT:
            return updateObject(state, {
                loading: false,
                purchased: false
            });
        case actionTypes.ORDER_CLICK_INIT:
            return updateObject(state, {
                loading: true
            });
        case actionTypes.ORDER_SUCCESS:
            return updateObject(state, {
                orders: state.orders.concat(action.orderData),
                loading: false,
                purchased: true
            });
        case actionTypes.ORDER_ERROR:
            return updateObject(state, {
                loading: false,
                purchased: false
            });
        case actionTypes.FETCH_ORDERS_INIT:
            return updateObject(state, {
                loading: true
            })
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                orders: action.orders,
                loading: false
            })
        case actionTypes.FETCH_ORDERS_ERROR: 
            return {
                ...state
            }
        default:
            return state;
    };
};

export default ordersReducer;