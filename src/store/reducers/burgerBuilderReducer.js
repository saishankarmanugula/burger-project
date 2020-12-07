import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const burgerBuilderReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: 
            const updatedIngredients = updateObject(state.ingredients, {
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            })

            return updateObject(state, {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            });
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = updateObject(state.ingredients, {
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            })

            return updateObject(state, {
                ingredients: updatedIng,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            });
        case actionTypes.INIT_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false
            });
        case actionTypes.INIT_INGREDIENTS_ERROR:
            return updateObject(state, {
                error: true
            });
        default: {
            return state;
        }
    }
};

export default burgerBuilderReducer;