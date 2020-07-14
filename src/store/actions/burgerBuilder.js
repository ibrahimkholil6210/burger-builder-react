import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = (igName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: {
            igName
        }
    };
}

export const removeIngredient = (igName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: { igName }
    };
}

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: {
            ingredients
        }
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredient = () => {
    return async (dispatch, getState) => {
        try {
            const fetcHReq = await axios.get('/ingredients.json');
            dispatch(setIngredients(fetcHReq.data));
        } catch (err) {
            dispatch(fetchIngredientsFailed())
        }
    }
}