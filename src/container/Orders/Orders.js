import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import classes from './orders.module.css';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import LoadingAnimatedImage from '../../assets/images/Infinity-1s-200px.gif';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    async componentDidMount() {
        const orders = await axios.get('https://burger-builder-8b7b4.firebaseio.com/order.json');
        const fetchData = [];
        for (let key in orders.data) {
            fetchData.push({
                ...orders.data[key],
                id: key
            });
        }

        this.setState({ orders: fetchData, loading: false });
    }

    render() {
        let Layout = null;
        if (this.state.orders.length > 0) {
            Layout = (
                this.state.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price} />)
            )
        }
        return (
            <div className={classes.Container}>
                {!this.state.loading ? Layout
                    : (
                        <div className={classes.AnimationWrapper}>
                            <img src={LoadingAnimatedImage} alt="Loading" />
                        </div>
                    )}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);