import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../store/action';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSumarry';
import axios from '../../axios-order';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';




class BurgerBuilder extends Component {

    state = {
        parchasing: false,
        UI: {
            sendingData: false
        }
    }


    updatePurchaseableHandler(ingredients) {
        let sum = 0;
        for (let key in ingredients) {
            sum = sum + ingredients[key];
        }
        return sum > 0;
    }


    purchaseHandler = () => {
        this.setState({ parchasing: true });
    }

    purchaseCancel = () => {
        this.setState({ parchasing: false });
    }

    continueHandler = async (e) => {

        this.props.history.push({
            pathname: '/checkout'
        });
    }

    render() {
        return (
            <Aux>
                <Modal show={this.state.parchasing} closeHandler={this.purchaseCancel}>
                    <OrderSummary
                        ingredients={this.props.ings}
                        closeHandler={this.purchaseCancel}
                        totalPrice={this.props.price}
                        parchaseContinueHandler={this.continueHandler}
                    />
                </Modal>
                <Burger ingredients={this.props.ings} />
                <BurgerControls
                    addIngredient={this.props.onIngredientAdded}
                    decreaseIngredient={this.props.onIngredientRemoved}
                    disabled={this.props.ings}
                    priceAmount={this.props.price}
                    parchaseable={this.updatePurchaseableHandler(this.props.ings)}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (igName) => dispatch({ type: actionType.ADD_INGREDIENT, payload: { igName } }),
        onIngredientRemoved: (igName) => dispatch({ type: actionType.REMOVE_INGREDIENT, payload: { igName } }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));