import React from 'react';
import classes from './input.module.css';

export default function Input(props) {
    let inputElement = null;
    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break
        case ('select'):
            inputElement = (
                <select className={classes.InputElement} onChange={props.changed}>
                    {props.elementConfig.options.map((option, index) => {
                        return <option key={index} value={option.value}>{option.displayValue}</option>
                    })}
                </select>
            );
            break
        default:
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed} />;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}
