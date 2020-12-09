import { remove, stat } from 'fs-extra';
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

const addIngredient = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    })

    return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    });
};

const removeIngredient = (state, action) => {
    const updatedIng = updateObject(state.ingredients, {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    })

    return updateObject(state, {
        ingredients: updatedIng,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    });
};

const initIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
    });
};

const initIngredientsError = (state, action) => {
    return updateObject(state, {
        error: true
    });
};

const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.INIT_INGREDIENTS: return initIngredients(state, action);
        case actionTypes.INIT_INGREDIENTS_ERROR: return initIngredientsError(state, action);
        default: return state;
    }
};

export default burgerBuilderReducer;