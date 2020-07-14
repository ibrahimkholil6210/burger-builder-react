import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            authData
        }
    };
}

export const authFailed = (err) => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: {
            err
        }
    };
}

export const auth = (email, password, isSignup) => {
    return async dispatch => {
        dispatch(authStart());
        try {
            const authData = {
                email: email,
                password: password,
                returnSecureToken: true
            }

            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFfHldAZB_6IZn40Sm5tOgk-leE7NtXHQ';
            if (!isSignup) {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFfHldAZB_6IZn40Sm5tOgk-leE7NtXHQ';
            }

            const sendSignUpData = await axios.post(url, authData);
            console.log(sendSignUpData)
            dispatch(authSuccess(sendSignUpData.data));
        } catch (err) {
            console.log(err.response)
            dispatch(authFailed(err));
        }
    }
}
