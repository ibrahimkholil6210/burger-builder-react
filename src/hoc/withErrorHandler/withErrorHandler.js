import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const WithErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        }

        componentWillMount() {
            this.reqInstance = axios.interceptors.request.use(req => {
                return req;
            });

            this.resInstance = axios.interceptors.response.use(res => res, err => {
                this.setState({ error: true });
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInstance);
            axios.interceptors.response.eject(this.resInstance);
        }

        closeHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} closeHandler={this.closeHandler}>
                        {this.state.error ? (<p>Network Error!</p>) : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
};

export default WithErrorHandler;