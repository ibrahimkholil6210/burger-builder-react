import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import classes from './orders.module.css';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import LoadingAnimatedImage from '../../assets/images/Infinity-1s-200px.gif';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    async componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let Layout = null;
        if (this.props.orders.length > 0) {
            Layout = (
                this.props.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price} />)
            )
        }
        return (
            <div className={classes.Container}>
                {!this.props.loading ? Layout
                    : (
                        <div className={classes.AnimationWrapper}>
                            <img src={LoadingAnimatedImage} alt="Loading" />
                        </div>
                    )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (authToken) => dispatch(actions.fetchOrders(authToken)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));