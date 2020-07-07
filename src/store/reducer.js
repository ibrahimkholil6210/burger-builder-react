import * as actionType from './action';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
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
        default:
            return state
    }
};


export default reducer;