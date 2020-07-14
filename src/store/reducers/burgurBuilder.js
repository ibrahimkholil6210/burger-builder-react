import * as actionType from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENTS_PRICE = {
    salad: 1,
    cheese: 2,
    bacon: 3,
    meat: 4
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.igName]: state.ingredients[action.payload.igName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.payload.igName]
            }
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.igName]: state.ingredients[action.payload.igName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.payload.igName]
            }
        case actionType.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload.ingredients,
                error: false,
                totalPrice: 4
            }
        case actionType.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
};


export default reducer;