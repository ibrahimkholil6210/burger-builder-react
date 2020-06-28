import React, { Component } from 'react';
import classes from './modal.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

export default class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }
    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} modalClose={this.props.closeHandler} />
                <div className={this.props.show ? `${classes.Modal} ${classes.show}` : `${classes.Modal} ${classes.hide}`}>
                    {this.props.children}
                </div >
            </Aux>
        )
    }
}
