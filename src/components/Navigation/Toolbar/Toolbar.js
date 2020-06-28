import React from 'react';
import classes from './toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Drawertoggler from '../SideDrawer/DrawerToggler/DrawerToggler';

export default function Toolbar(props) {
    return (
        <header className={classes.Toolbar}>
            <Drawertoggler clicked={props.drawerToggleHandler} />
            <Logo />
            <nav className={[classes.DesktopOnly].join(' ')}>
                <NavigationItems />
            </nav>
        </header>
    )
}
