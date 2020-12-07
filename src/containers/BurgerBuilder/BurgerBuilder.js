import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../hoc/Axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/actionTypes';
import { addIngredientAC, removeIngredientAC, initIngredients } from '../../store/actions/burgerBuilder';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchased: false, // property to track click of order button
        loading: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map((key) => {
            return ingredients[key];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    purchasedHandler = () => {
        this.setState({
            purchased: true
        });
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchased: false
        });
    };

    purchaseContinueHandler = () => {
        console.log(this.props);
        this.props.onCheckoutInit();
        this.props.history.push('/checkout');
        // alert('You can continue;');
        // this.setState({
        //     loading: true
        // });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Sai Shankar',
        //         address: {
        //             street: 'kamparapu street',
        //             pincode: '533431',
        //             country: 'India'
        //         },
        //         email: 'saishankarmanugula@gmail.com'
        //     },
        //     deliveryMethod: 'fastest'
        // };

        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({
        //             loading: false,
        //             purchased: false
        //         });
        //         this.props.history.push({pathname: '/checkout'});
        //     })
        //     .catch(error => {
        //         this.setState({
        //             loading: false,
        //             purchased: false
        //         });
        //     });
    };

    render() {
        const disabledInfo = {
            ...this.props.ing
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        if (this.props.ing) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ing} />
                    <BuildControls
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        price={this.props.price}
                        orderButtonDisabled={this.updatePurchaseState(this.props.ing)}
                        order={this.purchasedHandler} />
                </Aux>
            );
        }

        let orderSummary = null;
        if (this.props.ing) {
            orderSummary = <OrderSummary ingredients={this.props.ing}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.price} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchased} backdropClick={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch(addIngredientAC(ingName)),
        onRemoveIngredient: (ingName) => dispatch(removeIngredientAC(ingName)),
        onInitIngredients: () => dispatch(initIngredients()),
        onCheckoutInit: () => dispatch(actions.checkoutInit())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));  