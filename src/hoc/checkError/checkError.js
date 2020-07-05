import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

class CheckError extends Component {
    state = {
        ingredients: this.props.ingredients,
        error: null,
    }

    componentWillMount() {
        if (Object.keys(this.state.ingredients).length === 0) {
            this.setState({ error: true });
        }
    }

    closeHandler = () => {
        this.setState({ error: null });
        this.props.history.push('/');
    }

    render() {
        return (
            <Aux>
                <Modal show={this.state.error} closeHandler={this.closeHandler}>
                    {this.state.error ? (<p>No ingredients selected!</p>) : null}
                </Modal>
                {this.props.children}
            </Aux>
        );
    }
};

export default CheckError;