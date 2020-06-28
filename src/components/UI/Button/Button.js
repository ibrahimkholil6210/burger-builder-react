import React from 'react';
import classes from './button.module.css';

export default function Button(props) {
    return (
        <button className={[classes.Button, classes[props.btnType]].join(' ')} onClick={props.clicked}>{props.children}</button>
    )
}
