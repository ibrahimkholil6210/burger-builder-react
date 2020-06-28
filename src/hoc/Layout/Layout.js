import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

export default class Layout extends Component {
    state = {
        showDrawer: false,
    }

    drawerToggleHandler = () => {
        this.setState({ showDrawer: !this.state.showDrawer });
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleHandler={this.drawerToggleHandler} />
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
