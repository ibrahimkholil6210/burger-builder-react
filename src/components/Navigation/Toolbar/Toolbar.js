import React from 'react';
import classes from './toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

export default function Toolbar(props) {
    return (
        <header className={classes.Toolbar}>
            <div>Menu</div>
            <Logo />
            <nav className={[classes.DesktopOnly].join(' ')}>
                <NavigationItems />
            </nav>
        </header>
    )
}
