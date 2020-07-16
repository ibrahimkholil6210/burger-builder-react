import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showDrawer: false,
    }

    drawerToggleHandler = () => {
        this.setState({ showDrawer: !this.state.showDrawer });
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleHandler={this.drawerToggleHandler} isAuth={this.props.isAuthenticated} />
                <SideDrawer
                    showDrawer={this.state.showDrawer}
                    drawerToggleHandler={this.drawerToggleHandler}
                    isAuth={this.props.isAuthenticated}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Layout);

