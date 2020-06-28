import React from 'react';
import classes from './backdrop.module.css';

export default function Backdrop(props) {
    return (
        <div className={props.show ? classes.Backdrop : null} onClick={props.modalClose}></div>
    )
}
