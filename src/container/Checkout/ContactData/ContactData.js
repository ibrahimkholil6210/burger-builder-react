import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';
import LoadingAnimatedImage from '../../../assets/images/Infinity-1s-200px.gif';

export default class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name?'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your email?'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street?'
                },
                value: ''
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip Code?'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ''
            }
        },
        sendingData: false,
        totalPrice: 4
    }

    async componentDidMount() {
        const priceObj = await axios.get('https://burger-builder-8b7b4.firebaseio.com/ingredientsPrice.json');
        const data = priceObj.data;
        let price = 0;
        for (const key in data) {
            let calc = this.props.ingredients[key] * data[key];
            price += calc;
        }
        this.setState({ totalPrice: this.state.totalPrice + price, ingredients: this.props.ingredients })
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
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: formData
        };

        await axios.post('/order.json', dataToSendObj);
        this.setState({
            sendingData: false
        });
        this.props.history.push('/');
    }

    inputChangedHandler = (e, targetElement) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFromElement = {
            ...updatedOrderForm[targetElement]
        };

        updatedFromElement.value = e.target.value;
        updatedOrderForm[targetElement] = updatedFromElement;
        this.setState({ orderForm: updatedOrderForm });
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
                                        changed={(e) => this.inputChangedHandler(e, FormElement.id)} />
                                })}
                            </div>
                            <div>
                                <Button btnType="Success">ORDER</Button>
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
