import * as actionTypes from './actionTypes';
import axios from '../../hoc/Axios';

export const initIngredientsAC = (ingredients) => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
        ingredients: ingredients
    };
};

export const initIngredientsError = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS_ERROR,
        value: true
    };
};

export const initIngredients = () => {
    return (dispatch) => {
        axios.get('https://react-my-burger-ac1bc.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(initIngredientsAC({
                    salad: response.data.salad,
                    bacon: response.data.bacon,
                    cheese: response.data.cheese,
                    meat: response.data.meat
                }));
            })
            .catch(error => {
                dispatch(initIngredientsError());
            });
    };
};

export const addIngredientAC = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    };
};

export const removeIngredientAC = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    };
};

