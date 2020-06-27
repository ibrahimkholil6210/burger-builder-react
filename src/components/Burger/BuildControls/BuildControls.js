import React from 'react';
import classes from './buildcontrols.module.css';
import BuildControl from './BuildControl/BuildControl';

const control = [
    { 'label': 'Salad', type: 'salad' },
    { 'label': 'Bacon', type: 'bacon' },
    { 'label': 'Cheese', type: 'cheese' },
    { 'label': 'Meat', type: 'meat' },
]

export default function BuildControls(props) {
    return (
        <div className={classes.BuildControls}>
            {control.map(con => (
                <BuildControl key={con.label} label={con.label} addHandler={() => props.addIngredient(con.type)} />
            ))}
        </div>
    )
}
