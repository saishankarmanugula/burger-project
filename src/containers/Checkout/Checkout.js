import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import qs from 'qs';
import ContactData from '../Checkout/ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {

    purchaseCancelHandler = () => {
        this.props.history.goBack();
    }

    purchaseContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
        console.log(this.props);
    }

    render() {
        let summary = <Redirect to='/' />
        let purchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null ; 
        if (this.props.ing) {
            summary = <CheckoutSummary
                ingredients={this.props.ing}
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler} />
        }
        return (       
            <div>
                {purchasedRedirect}
                {summary}
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>

           
        );
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        purchased: state.orders.purchased
    };
};

export default connect(mapStateToProps)(Checkout);