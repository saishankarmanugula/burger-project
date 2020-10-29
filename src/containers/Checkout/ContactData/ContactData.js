import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../hoc/Axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        formDetails: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            pincode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Pincode'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: ''
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
                value: ''
            }
        },
        loading: false
    }

    orderClickHandler = (event) => {
        event.preventDefault();
        console.log(this.props);

        this.setState({
            loading: true
        });
        
        let customerDetails = {};
        for(let key in this.state.formDetails) {
            customerDetails[key] = this.state.formDetails[key].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: customerDetails
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false
                });
                this.props.history.push({ pathname: '/' });
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            });


    }

    onChangedHandler = (event, id) => {
        // console.log(event.target.value);    
        let updatedFormDetails = {...this.state.formDetails};
        let updatedValueDetails = {...updatedFormDetails[id]};
        updatedValueDetails.value = event.target.value;
        updatedFormDetails[id] = updatedValueDetails;
        this.setState({
            formDetails: updatedFormDetails
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
                            changed={(event) => this.onChangedHandler(event, inputElement.id)}/>
                ))}
                <Button btnType="Success">Order Now</Button>
            </form>
        );
        if (this.state.loading) {
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

export default ContactData;