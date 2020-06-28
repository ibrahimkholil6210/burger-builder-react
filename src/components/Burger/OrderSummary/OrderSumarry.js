import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import classes from '../OrderSummary/ordersumarry.module.css';

export default function OrderSumarry(props) {
    let ingredientsList = Object.keys(props.ingredients).map(ingredient => {
        return <li key={ingredient} className={classes.IngredientList}>
            <span className={classes.IngredientListSpan}>{ingredient}:</span>{props.ingredients[ingredient]}
        </li>
    });

    return (
        <Aux>
            <h2>Your Order!</h2>
            <p>A delecious order with following ingredients:</p>
            <ul className={classes.IngredientsUL}>
                {ingredientsList}
            </ul>
            <p>Procced to checkout?</p>
        </Aux>
    )
}
