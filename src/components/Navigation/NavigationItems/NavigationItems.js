import React from 'react';
import classes from './navigationitems.module.css';
import NavigationItem from './NavigationItem';

export default function NavigationItems() {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem href="/" exact>Burger Builder</NavigationItem>
            <NavigationItem href="/orders">Orders</NavigationItem>
            <NavigationItem href="/auth">Authenticate</NavigationItem>
        </ul>
    )
}
