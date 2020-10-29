import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import qs from 'qs';
import ContactData from '../Checkout/ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            meat: 1,
            cheese: 1
        },
        totalPrice: 0
    }
    // let ingredientsQ;

    componentDidMount() {
        let queryParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        let ingredientsQ;
        if (Object.keys(queryParams).length !== 0) {
            ingredientsQ = {
                salad: parseInt(queryParams.salad),
                bacon: parseInt(queryParams.bacon),
                meat: parseInt(queryParams.meat),
                cheese: parseInt(queryParams.cheese)
            }
        } else {
            ingredientsQ = {
                salad: 1,
                bacon: 1,
                meat: 1,
                cheese: 1
            }
        }

        this.setState({
            ingredients: ingredientsQ,
            totalPrice: parseFloat(queryParams.totalPrice)
        })
        console.log(queryParams);
        console.log(this.state.ingredients);
    }

    purchaseCancelHandler = () => {
        this.props.history.goBack();
    }

    purchaseContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
        console.log(this.props);
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} cancel={this.purchaseCancelHandler} continue={this.purchaseContinueHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)
                    } />
            </div>
        );
    }
}

export default Checkout;