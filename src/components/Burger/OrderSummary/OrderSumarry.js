import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from '../OrderSummary/ordersumarry.module.css';
import Button from '../../UI/Button/Button';

export default function OrderSumarry(props) {

    let ingredientsList = Object.keys(props.ingredients).map(ingredient => {
        return <li key={ingredient} className={classes.IngredientList}>
            <span className={classes.IngredientListSpan}>{ingredient}:</span>{props.ingredients[ingredient]}
        </li>
    });

    return (
        <Aux>
            <>
                <h2>Your Order!</h2>
                <p>A delecious order with following ingredients:</p>
                <ul className={classes.IngredientsUL}>
                    {ingredientsList}
                </ul>
                <p><strong>Total Price:</strong> {props.totalPrice}</p>
                <p>Procced to checkout?</p>
                <Button btnType="Danger" clicked={props.closeHandler}>Close</Button>
                <Button btnType="Success" clicked={props.parchaseContinueHandler}>Continue</Button>
            </>
        </Aux >
    )
}
