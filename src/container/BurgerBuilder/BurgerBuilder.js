import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacion: 0.6,
    cheese: 0.3,
    meat: 1
}

export default class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        },
        totalPrice: .4
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients,
            [type]: this.state.ingredients[type] + 1
        };
        const pricing = this.totalPrice + INGREDIENTS_PRICE[type];

        this.setState({ ingredients: updatedIngredients, totalPrice: pricing });
    }

    decreaseIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients,
            [type]: this.state.ingredients[type] - 1
        };
        const pricing = this.totalPrice - INGREDIENTS_PRICE[type];

        this.setState({ ingredients: updatedIngredients, totalPrice: pricing });
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls
                    addIngredient={this.addIngredientHandler}
                    decreaseIngredient={this.decreaseIngredientHandler}
                    disabled={this.state.ingredients}
                />
            </Aux>
        )
    }
}
