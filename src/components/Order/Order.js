import React from 'react';
import classes from './order.module.css';

export default function Order() {
    return (
        <div className={classes.Order}>
            <p>Ingredients: Salad (1)</p>
            <p>Price: <strong>$ 5.45</strong></p>
        </div>
    )
}
