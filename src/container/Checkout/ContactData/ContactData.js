import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';

export default class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
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

    orederBtnHandler = async (e) => {
        e.preventDefault();
        this.setState({
            sendingData: true
        })
        const dataToSendObj = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Ibrahim',
                address: {
                    street: 'Raipara court',
                    postalCode: '6002',
                },
                email: 'test@gmail.com'
            }
        };

        await axios.post('/order.json', dataToSendObj);
        this.setState({
            sendingData: false
        })
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <div>
                        <input type="text" name="name" placeholder="Your Name!" className={classes.Form} autoComplete="off" />
                    </div>
                    <div>
                        <input type="text" name="email" placeholder="Your Email!" className={classes.Form} autoComplete="off" />
                    </div>
                    <div>
                        <input type="text" name="street" placeholder="Your Street!" className={classes.Form} autoComplete="off" />
                    </div>
                    <div>
                        <input type="text" name="postal" placeholder="Your Postal!" className={classes.Form} autoComplete="off" />
                    </div>
                    <div>
                        <Button btnType="Success" clicked={this.orederBtnHandler}>ORDER</Button>
                    </div>
                </form>
            </div>
        )
    }
}
