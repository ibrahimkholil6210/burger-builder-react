import React from 'react';
import classes from './navigationitem.module.css';

export default function NavigationItem(props) {
    return (
        <li className={classes.NavigationItem}>
            <a
                href={props.href}
                className={props.active ? classes.active : null}
            >
                {props.children}
            </a>
        </li>
    )
}
