import React from 'react';
import classes from './navigationitems.module.css';
import NavigationItem from './NavigationItem';

export default function NavigationItems() {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem href="/" active={true}>Burger Builder</NavigationItem>
            <NavigationItem href="/">Checkout</NavigationItem>
        </ul>
    )
}
