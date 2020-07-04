import React from 'react';
import classes from './navigationitem.module.css';
import { NavLink } from 'react-router-dom';

export default function NavigationItem(props) {
    return (
        <li className={classes.NavigationItem}>
            <NavLink to={props.href} activeClassName={classes.active} exact={props.exact}>
                {props.children}
            </NavLink>
        </li>
    )
}
