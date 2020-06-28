import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

export default class Layout extends Component {
    state = {
        showDrawer: true,
    }

    drawerToggleHandler = () => {
        this.setState({ showDrawer: false });
    }

    render() {
        return (
            <Aux>
                <Toolbar />
                <SideDrawer
                    showDrawer={this.state.showDrawer}
                    drawerToggleHandler={this.drawerToggleHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
