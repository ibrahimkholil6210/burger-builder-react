import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions/index';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSumarry';
import axios from '../../axios-order';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import LoadingAnimatedImage from '../../assets/images/Infinity-1s-200px.gif';
import classes from './burgerBuilder.module.css';

class BurgerBuilder extends Component {

    state = {
        parchasing: false,
        UI: {
            sendingData: false
        }
    }

    componentDidMount() {
        this.props.onInitIngredients();
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
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout'
        });
    }

    render() {
        let Layout = null;
        if (this.props.error) {
            Layout = (
                <p>Problem While Fetching data</p>
            )
        } else {
            Layout = (
                <>
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
                </>
            )
        }
        return (
            <Aux>
                {this.props.ings === null && this.props.error === false ? (
                    <div className={classes.AnimationWrapper}>
                        <img src={LoadingAnimatedImage} alt="Loading" />
                    </div>
                ) : (
                        Layout
                    )}

            </Aux>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (igName) => dispatch(actionType.addIngredient(igName)),
        onIngredientRemoved: (igName) => dispatch(actionType.removeIngredient(igName)),
        onInitIngredients: () => dispatch(actionType.initIngredient()),
        onInitPurchase: () => dispatch(actionType.purchseInit()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));