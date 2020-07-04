import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import classes from './orders.module.css';

export default class Orders extends Component {
    render() {
        return (
            <div className={classes.Container}>
                <Order />
            </div>
        )
    }
}
