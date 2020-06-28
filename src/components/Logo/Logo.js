import React from 'react';
import img from '../../assets/images/28.1 burger-logo.png.png';
import classes from './logo.module.css';

export default function Logo(props) {
    return (
        <div className={classes.Logo}>
            <img src={img} alt="Burger Logo" />
        </div>
    )
}
