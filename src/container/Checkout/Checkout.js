import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

export default class Checkout extends Component {
    state = {
        ingredients: null
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (const [key, val] of query.entries()) {
            ingredients[key] = parseInt(val);
        }
        this.setState({ ingredients });
    }

    checkoutCancel = () => {
        this.props.history.goBack();
    }

    checkConfirm = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} checkConfirm={this.checkConfirm} checkoutCancel={this.checkoutCancel} />
                <Route path={this.props.match.path + '/contact-data'} render={(props) => <ContactData ingredients={this.state.ingredients} {...props} />} />
            </div>
        )
    }
}
