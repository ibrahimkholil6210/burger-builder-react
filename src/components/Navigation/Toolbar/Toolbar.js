import React from 'react';
import classes from './toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

export default function Toolbar(props) {
    return (
        <header className={[classes.Toolbar, classes.DesktopOnly].join(' ')}>
            <div>Menu</div>
            <Logo />
            <nav>
                <NavigationItems />
            </nav>
        </header>
    )
}
