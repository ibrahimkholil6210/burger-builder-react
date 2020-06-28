import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './sidedrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

export default function SindeDrawer(props) {
    let drawerCssToggle = [classes.SideDrawer, classes.Open].join(' ');
    if (!props.showDrawer) {
        drawerCssToggle = [classes.SideDrawer, classes.Close].join(' ');
    }
    return (
        <Aux>
            <Backdrop show={props.showDrawer} modalClose={props.drawerToggleHandler} />
            <div className={drawerCssToggle}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}
