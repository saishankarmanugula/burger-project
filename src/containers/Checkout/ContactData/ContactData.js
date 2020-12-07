import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../hoc/Axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component {
    state = {
        formDetails: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            pincode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Pincode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'Fastest',
                        displayValue: 'Fastest'
                    },{
                        value: 'Cheapest',
                        displayValue: 'Cheapest'
                    }
                ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }

    orderClickHandler = (event) => {
        event.preventDefault();
        console.log(this.props);

        this.props.orderClickInit();
        
        let customerDetails = {};
        for(let key in this.state.formDetails) {
            customerDetails[key] = this.state.formDetails[key].value;
        }

        const order = {
            ingredients: this.props.ing,
            price: this.props.price,
            orderData: customerDetails
        };

        this.props.orderClicked(order);

    }

    validityCheck = (value, rules) => {
        let isValid = true;
        if (rules.required) {
          isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    onChangedHandler = (event, id) => {
        // console.log(event.target.value);    
        let updatedFormDetails = {...this.state.formDetails};
        let updatedValueDetails = {...updatedFormDetails[id]};
        updatedValueDetails.value = event.target.value;
        updatedValueDetails.valid = this.validityCheck(updatedValueDetails.value, updatedValueDetails.validation);
        updatedValueDetails.touched = true;
        updatedFormDetails[id] = updatedValueDetails;
        let isFormValid =true;
        for(let item in updatedFormDetails) {
            isFormValid = updatedFormDetails[item].valid && isFormValid;
        }
        console.log(updatedFormDetails[id].valid);
        this.setState({
            formDetails: updatedFormDetails,
            formIsValid: isFormValid
        });
        // console.log(this.state.formDetails.name.value);
    }

    render() {
        let formDetailsArray = [];
        for (let key in this.state.formDetails){
            formDetailsArray.push({
                id: key,
                config: this.state.formDetails[key]}
                )
        }
     
        let form = (
            <form onSubmit={this.orderClickHandler}>
                {formDetailsArray.map(inputElement => (
                    <Input key={inputElement.id} 
                            elementType={inputElement.config.elementType} 
                            {...inputElement.config.elementConfig}
                            inValid={!inputElement.config.valid}
                            shouldValidate={inputElement.config.validation}
                            touched={inputElement.config.touched}
                            changed={(event) => this.onChangedHandler(event, inputElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order Now</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Please fill the Contact details</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.orders.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        orderClickInit: () => dispatch(actions.orderClickInit()),
        orderClicked: (orderData) => dispatch(actions.orderClickedAC(orderData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));