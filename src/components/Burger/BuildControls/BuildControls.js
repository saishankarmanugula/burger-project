import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
              <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {
                controls.map(obj => {
                    return <BuildControl key={obj.label}
                        label={obj.label}
                        added={() => props.ingredientAdded(obj.type)}
                        removed={() => props.ingredientRemoved(obj.type)}
                        disable={props.disabled[obj.type]} />;
                })
            }
            <button 
            className={classes.OrderButton}
            disabled={!props.orderButtonDisabled}
            onClick={props.order}>Order Now</button>


        </div>
    );
};

export default buildControls;