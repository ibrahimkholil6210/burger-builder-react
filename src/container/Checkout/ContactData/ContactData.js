import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

export default class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <div>
                        <input type="text" name="name" placeholder="Your Name!" className={classes.Form} />
                    </div>
                    <div>
                        <input type="text" name="email" placeholder="Your Email!" className={classes.Form} />
                    </div>
                    <div>
                        <input type="text" name="street" placeholder="Your Street!" className={classes.Form} />
                    </div>
                    <div>
                        <input type="text" name="postal" placeholder="Your Postal!" className={classes.Form} />
                    </div>
                    <div>
                        <Button btnType="Success">ORDER</Button>
                    </div>
                </form>
            </div>
        )
    }
}
