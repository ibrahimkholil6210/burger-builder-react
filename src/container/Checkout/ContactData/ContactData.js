import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';
import CheckError from '../../../hoc/checkError/checkError';
import LoadingAnimatedImage from '../../../assets/images/Infinity-1s-200px.gif';

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
        sendingData: false,
        formIsValid: false
    }


    orderHandler = async (e) => {
        e.preventDefault();
        this.setState({
            sendingData: true
        });

        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        const dataToSendObj = {
            ingredients: this.props.ings,
            price: this.props.price,
            customer: formData
        };

        await axios.post('/order.json', dataToSendObj);
        this.setState({
            sendingData: false
        });
        this.props.history.push('/');
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
        let formIsValid = true;
        for (let key in updatedOrderForm) {
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid });
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
            <CheckError ingredients={this.props.ings} {...this.props}>
                <div className={classes.ContactData}>
                    {!this.state.sendingData ? (
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
            </CheckError>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);