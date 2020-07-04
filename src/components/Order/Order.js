import React from 'react';
import classes from './order.module.css';

export default function Order(props) {

    const ingredients = [];
    for (let IgName in props.ingredients) {
        ingredients.push({
            name: IgName,
            quantity: props.ingredients[IgName]
        });
    }

    const ingredientsInnerLayout = ingredients.map((ingredient, index) => {
        return <span className={classes.IngredientTag} key={index}>{ingredient.name} ({ingredient.quantity}) </span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsInnerLayout}</p>
            <p>Price: <strong>$ {props.price}</strong></p>
        </div>
    )
}
