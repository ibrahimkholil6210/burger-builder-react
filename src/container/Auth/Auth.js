import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './auth.module.css';
import * as actions from '../../store/actions/index';
import LoadingAnimatedImage from '../../assets/images/Infinity-1s-200px.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email?'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: '******'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    switchAuthHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    checkValidation = (value, rule) => {
        let validity = false;

        if (rule.required) {
            validity = value.trim() !== '';
        }
        if (rule.minLength) {
            validity = value.length > 5;
        }
        if (rule.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            validity = pattern.test(value) && validity;
        }

        return validity;
    }

    inputChangedHandler = (e, formElement) => {
        const updatedControls = {
            ...this.state.controls,
            [formElement]: {
                ...this.state.controls[formElement],
                value: e.target.value,
                valid: this.checkValidation(e.target.value, this.state.controls[formElement].validation),
                touched: true
            }
        }

        this.setState({ controls: updatedControls })
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    render() {
        const FormElementsArray = [];
        for (let key in this.state.controls) {
            FormElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        const form = FormElementsArray.map((FormElement, index) => {
            return (
                <Input
                    key={index}
                    elementType={FormElement.config.elementType}
                    elementConfig={FormElement.config.elementConfig}
                    value={FormElement.config.value}
                    changed={(e) => this.inputChangedHandler(e, FormElement.id)}
                    isValid={FormElement.config.valid}
                    validationRequired={FormElement.config.validation}
                    isTouched={FormElement.config.touched}
                />
            )
        })
        const notify = (err) => toast.error(err.message, { onOpen: () => this.props.onToastClose() });

        if (this.props.error) {
            notify(this.props.error);
        }

        return this.props.isAuthenticated ? <Redirect to={this.props.authRedirectPath} /> : (
            <div className={classes.ContactData}>
                <h4>Authenticate!</h4>
                {this.props.loading ? (
                    <div className={classes.AnimationWrapper}>
                        <img src={LoadingAnimatedImage} alt="Loading" />
                    </div>
                ) : (
                        <>
                            <form onSubmit={this.submitHandler}>
                                {form}
                                <Button btnType="Success"> SUBMIT</Button >
                            </form>
                            <Button btnType="Danger" clicked={this.switchAuthHandler}>{!this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
                        </>
                    )}
                <ToastContainer />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onToastClose: () => dispatch(actions.authErrorReset()),
        onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);