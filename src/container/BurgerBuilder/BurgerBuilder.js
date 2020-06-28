import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSumarry';

const INGREDIENTS_PRICE = {
    salad: .5,
    bacon: 2,
    cheese: 2,
    meat: 1
}

export default class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        parchaseable: false,
        parchasing: false
    }

    updatePurchaseableHandler(ingredients) {
        let sum = 0;
        for (let key in ingredients) {
            sum = sum + ingredients[key];
        }
        this.setState({ parchaseable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients,
            [type]: this.state.ingredients[type] + 1
        };
        const pricing = this.state.totalPrice + INGREDIENTS_PRICE[type];
        this.setState({ ingredients: updatedIngredients, totalPrice: pricing });
        this.updatePurchaseableHandler(updatedIngredients);
    }

    decreaseIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients,
            [type]: this.state.ingredients[type] - 1
        };
        const pricing = this.state.totalPrice - INGREDIENTS_PRICE[type];
        this.setState({ ingredients: updatedIngredients, totalPrice: pricing });
        this.updatePurchaseableHandler(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({ parchasing: true });
    }

    purchaseCancel = () => {
        this.setState({ parchasing: false });
    }

    continueHandler = (e) => {
        console.log("Hei!")
    }

    render() {
        return (
            <Aux>
                <Modal show={this.state.parchasing} closeHandler={this.purchaseCancel}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        closeHandler={this.purchaseCancel}
                        totalPrice={this.state.totalPrice}
                        parchaseContinueHandler={this.continueHandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls
                    addIngredient={this.addIngredientHandler}
                    decreaseIngredient={this.decreaseIngredientHandler}
                    disabled={this.state.ingredients}
                    priceAmount={this.state.totalPrice}
                    parchaseable={this.state.parchaseable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        )
    }
}
