import React from 'react';
import classes from './modal.module.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

export default function Modal(props) {
    return (
        <Aux>
            <Backdrop show={props.show} modalClose={props.closeHandler} />
            <div className={props.show ? `${classes.Modal} ${classes.show}` : `${classes.Modal} ${classes.hide}`}>
                {props.children}
            </div >
        </Aux>
    )
}
