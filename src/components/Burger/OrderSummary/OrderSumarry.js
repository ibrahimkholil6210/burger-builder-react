import React from 'react';
import Aux from '../../../hoc/Auxiliary';

export default function OrderSumarry(props) {
    let ingredientsList = Object.keys(props.ingredients).map(ingredient => {
        return <li key={ingredient}><span>{ingredient}:</span>{props.ingredients[ingredient]}</li>
    });

    return (
        <Aux>
            <h2>Your Order!</h2>
            <p>A delecious order with following ingredients:</p>
            <ul>
                {ingredientsList}
            </ul>
            <p>Procced to checkout?</p>
        </Aux>
    )
}
