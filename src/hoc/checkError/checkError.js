import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

class CheckError extends Component {

    closeHandler = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <Aux>
                <Modal show={this.props.price === 4 ? true : false} closeHandler={this.closeHandler}>
                    <p>No ingredients selected!</p>
                </Modal>
                {this.props.children}
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(CheckError);