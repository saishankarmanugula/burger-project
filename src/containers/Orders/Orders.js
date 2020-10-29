import React, { Component } from 'react';
import Order from './Order/Order';
import axios from '../../hoc/Axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key], id: key
                    });
                }
                this.setState({
                    orders: fetchedOrders,
                    loading: false
                })
                // console.log(fetchedOrders);
            })
            .catch(err => {
                this.setState({
                    loading: false
                })
            });
    }

    render() {
        let output;
        if (this.state.loading === true) {
            output = <Spinner />;
        } else {
            output = this.state.orders.map(order => (
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

export default withErrorHandler(Orders, axios);