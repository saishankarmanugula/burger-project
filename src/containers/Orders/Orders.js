import React, { Component } from 'react';
import Order from './Order/Order';
import axios from '../../hoc/Axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
       this.props.fetchOrders();
    }

    render() {
        let output;
        if (this.props.loading === true) {
            output = <Spinner />;
        } else {
            output = this.props.orders.map(order => (
                <Order key={order.id} price={order.price} ingredients={order.ingredients}/>
            ));
        }
        return (
            <div>
                {output}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(actions.fetchOrders())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));