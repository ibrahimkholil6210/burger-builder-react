import React from 'react';
import classes from './modal.module.css';

export default function Modal(props) {
    return (
        <div className={props.show ? `${classes.Modal} ${classes.show}` : `${classes.Modal} ${classes.hide}`}>
            {props.children}
        </div >
    )
}
