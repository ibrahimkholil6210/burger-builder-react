import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';
import LoadingAnimatedImage from '../../../assets/images/Infinity-1s-200px.gif';
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name?'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your email?'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street?'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip Code?'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                valid: true,
                validation: {}
            }
        },
        formIsValid: false
    }


    orderHandler = async (e) => {
        e.preventDefault();

        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        const dataToSendObj = {
            ingredients: this.props.ings,
            price: this.props.price,
            customer: formData,
            userId: this.props.userId
        };

        this.props.onOrderBurger(dataToSendObj);
    }

    checkValidation = (value, rule) => {
        let validity = false;

        if (rule.required) {
            validity = value.trim() !== '';
        }
        return validity;
    }

    inputChangedHandler = (e, targetElement) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFromElement = {
            ...updatedOrderForm[targetElement]
        };

        updatedFromElement.value = e.target.value;
        updatedFromElement.valid = this.checkValidation(updatedFromElement.value, updatedFromElement.validation);
        updatedFromElement.touched = true;
        updatedOrderForm[targetElement] = updatedFromElement;
        let formValid = true;
        for (let key in updatedOrderForm) {
            formValid = updatedOrderForm[key].valid && formValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formValid });
    }

    render() {
        const FormElementsArray = [];
        for (let key in this.state.orderForm) {
            FormElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        return (
            <div className={classes.ContactData}>
                {!this.props.loading ? (
                    <>
                        <h4>Enter your Contact Data</h4>
                        <form onSubmit={this.orderHandler}>
                            <div>
                                {FormElementsArray.map((FormElement, index) => {
                                    return <Input
                                        elementType={FormElement.config.elementType}
                                        elementConfig={FormElement.config.elementConfig}
                                        value={FormElement.config.value}
                                        key={index}
                                        changed={(e) => this.inputChangedHandler(e, FormElement.id)}
                                        isValid={FormElement.config.valid}
                                        validationRequired={FormElement.config.validation}
                                        isTouched={FormElement.config.touched}
                                    />
                                })}
                            </div>
                            <div>
                                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                            </div>
                        </form>
                    </>
                ) : (
                        <div className={classes.AnimationWrapper}>
                            <img src={LoadingAnimatedImage} alt="Loading" />
                        </div>
                    )}


            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));