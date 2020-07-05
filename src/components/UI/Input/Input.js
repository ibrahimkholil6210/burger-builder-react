import React from 'react';
import classes from './input.module.css';

export default function Input(props) {
    let inputElement = null;
    const styleClasses = [classes.InputElement];

    if (!props.isValid && props.validationRequired) {
        styleClasses.push(classes.Invalid)
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={styleClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break
        case ('select'):
            inputElement = (
                <select className={styleClasses.join(' ')} onChange={props.changed}>
                    {props.elementConfig.options.map((option, index) => {
                        return <option key={index} value={option.value}>{option.displayValue}</option>
                    })}
                </select>
            );
            break
        default:
            inputElement = <input className={styleClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}
