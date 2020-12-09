import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
 
const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const checkoutInit = (state, action) => {
    return updateObject(state, {
        loading: false,
        purchased: false
    });
};

const orderClickInit = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const orderSuccess = (state, action) => {
    return updateObject(state, {
        orders: state.orders.concat(action.orderData),
        loading: false,
        purchased: true
    });
};

const orderError = (state, action) => {
    return updateObject(state, {
        loading: false,
        purchased: false
    });
};

const fetchOrdersInit = (state, action) => {
    return updateObject(state, {
        loading: true
    })
};

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    })
};

const fetchOrdersError = (state, action) => {
    return {
        ...state
    }
};

const ordersReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.CHECKOUT_INIT: return checkoutInit(state, action);
            
        case actionTypes.ORDER_CLICK_INIT: return orderClickInit(state, action);
            
        case actionTypes.ORDER_SUCCESS: return orderSuccess(state, action);
            
        case actionTypes.ORDER_ERROR: return orderError(state, action);
            
        case actionTypes.FETCH_ORDERS_INIT: return fetchOrdersInit(state, action);
            
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
            
        case actionTypes.FETCH_ORDERS_ERROR: return fetchOrdersError(state, action);
            
        default: return state;
    };
};

export default ordersReducer;