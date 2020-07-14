import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckError from '../../hoc/checkError/checkError';

class Checkout extends Component {

    checkoutCancel = () => {
        this.props.history.goBack();
    }

    checkConfirm = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <CheckError ingredients={this.props.ings} {...this.props}>
                {this.props.price > 4 ? (
                    <>
                        <CheckoutSummary ingredients={this.props.ings} checkConfirm={this.checkConfirm} checkoutCancel={this.checkoutCancel} {...this.props} />
                        <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                    </>
                ) : null}
            </CheckError>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    }
}


export default connect(mapStateToProps)(Checkout);
