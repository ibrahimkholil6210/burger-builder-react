import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSumarry';
import axios from '../../axios-order';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


let INGREDIENTS_PRICE = null;

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        parchaseable: false,
        parchasing: false,
        UI: {
            sendingData: false
        }
    }

    async componentDidMount() {
        const fetchPrice = await axios.get('https://burger-builder-8b7b4.firebaseio.com/ingredientsPrice.json');
        INGREDIENTS_PRICE = fetchPrice.data;
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
        const priceDetermine = typeof INGREDIENTS_PRICE[type] === 'string' ? parseFloat(INGREDIENTS_PRICE[type]) : INGREDIENTS_PRICE[type];
        const pricing = this.state.totalPrice + priceDetermine;
        this.setState({ ingredients: updatedIngredients, totalPrice: pricing });
        this.updatePurchaseableHandler(updatedIngredients);
    }

    decreaseIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients,
            [type]: this.state.ingredients[type] - 1
        };
        const priceDetermine = typeof INGREDIENTS_PRICE[type] === 'string' ? parseFloat(INGREDIENTS_PRICE[type]) : INGREDIENTS_PRICE[type];
        const pricing = this.state.totalPrice - priceDetermine;
        this.setState({ ingredients: updatedIngredients, totalPrice: pricing });
        this.updatePurchaseableHandler(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({ parchasing: true });
    }

    purchaseCancel = () => {
        this.setState({ parchasing: false });
    }

    continueHandler = async (e) => {

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + this.state.ingredients[i]);
        }
        const queryStr = queryParams.join("&");

        this.props.history.push({
            pathname: '/checkout',
            search: "?" + queryStr
        });
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
                        isSending={this.state.UI.sendingData}
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

export default WithErrorHandler(BurgerBuilder, axios);