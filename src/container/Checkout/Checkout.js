import React, { Component, Suspense } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckError from '../../hoc/checkError/checkError';
const ContactData = React.lazy(() => import('./ContactData/ContactData'));

class Checkout extends Component {


    checkoutCancel = () => {
        this.props.history.goBack();
    }

    checkConfirm = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summery = <Redirect to="/" />
        if (this.props.ings) {
            const purchseRedirect = this.props.purchse ? <Redirect to="/" /> : null;
            summery = (
                <>
                    {purchseRedirect}
                    <CheckError ingredients={this.props.ings} {...this.props}>
                        {this.props.price > 4 ? (
                            <>
                                <CheckoutSummary ingredients={this.props.ings} checkConfirm={this.checkConfirm} checkoutCancel={this.checkoutCancel} {...this.props} />
                                <Route path={this.props.match.path + '/contact-data'}
                                    render={
                                        () => <Suspense fallback={<div>Loading...</div>}><ContactData /></Suspense>}
                                />
                            </>
                        ) : null}
                    </CheckError>
                </>
            )
        }
        return summery;
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchse: state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout);
