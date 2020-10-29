import React, { Component } from 'react';
import classes from './Order.css';

class Order extends Component {
    render() {
        const ingredients = [];
        for (let ingredientName in this.props.ingredients) {
            ingredients.push({
                name: ingredientName,
                value: this.props.ingredients[ingredientName]
            });
        }

        const ingOutput = ingredients.map(ingredient => {
            return (
                <span key={ingredient.name}
                    style={{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }}
                    >{ingredient.name}({ingredient.value})</span>
            );
        });
        return (
            <div className={classes.Order}>
                <p>Ingredients: {ingOutput}</p>
                <p>Price: <strong>USD {this.props.price}</strong></p>
            </div>
        );
    }
}

export default Order;