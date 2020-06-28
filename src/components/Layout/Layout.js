import React from 'react';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

export default function Layout(props) {
    return (
        <Aux>
            <Toolbar />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}