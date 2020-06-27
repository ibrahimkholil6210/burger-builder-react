import React from 'react';
import classes from './buildcontrol.module.css';

export default function BuildControl(props) {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} onClick={props.decreaseHandler}
                disabled={props.disabledDetermine[props.type] < 1 ? true : false}
            >-</button>
            <button className={classes.More} onClick={props.addHandler}>+</button>
        </div>
    )
}
