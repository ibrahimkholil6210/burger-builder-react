import React from 'react';
import BugerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './burger.module.css';

export default function Burger(props) {
    let transformIngredients = Object.keys(props.ingredients).map(ingredient => {
        return [...Array(props.ingredients[ingredient])].map((_, i) => {
            return <BugerIngredient type={ingredient} key={ingredient + i} />
        });
    }).reduce((arr, curEl) => {
        return arr.concat(curEl);
    }, []);

    if (transformIngredients.length === 0) {
        transformIngredients = <p>Please select ingredients to Build Burger!</p>;
    }


    return (
        <div className={classes.Burger}>
            <BugerIngredient type="bread-top" />
            {transformIngredients}
            <BugerIngredient type="bread-bottom" />
        </div>
    )
}
