import React from 'react';
import classes from './drawertoggler.module.css';

export default function DrawerToggler(props) {
    return (
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
