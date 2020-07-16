import React from 'react';
import classes from './navigationitems.module.css';
import NavigationItem from './NavigationItem';

export default function NavigationItems(props) {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem href="/" exact>Burger Builder</NavigationItem>
            {!props.isAuthenticated ?
                <NavigationItem href="/auth">Authenticate</NavigationItem>
                :
                <>
                    <NavigationItem href="/orders">Orders</NavigationItem>
                    <NavigationItem href="/logout">Logout</NavigationItem>
                </>
            }
        </ul>
    )
}
