import React from 'react';
import classes from './buildcontrol.module.css';

export default function BuildControl(props) {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less}>-</button>
            <button className={classes.More} onClick={props.addHandler}>+</button>
        </div>
    )
}
