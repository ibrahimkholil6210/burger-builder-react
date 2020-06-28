import React from 'react';
import classes from './toolbar.module.css';

export default function Toolbar(props) {
    return (
        <header className={classes.Toolbar}>
            <div>Menu</div>
            <div>Logo</div>
            <nav>
                ...
            </nav>
        </header>
    )
}
