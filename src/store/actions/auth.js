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
            error: err
        }
    };
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authCheckTimeout = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expTime * 1000)
    }
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
            dispatch(authSuccess(sendSignUpData.data));
            dispatch(authCheckTimeout(sendSignUpData.data.expiresIn));
        } catch (err) {
            dispatch(authFailed(err.response));
        }
    }
}

export const authErrorReset = () => {
    return {
        type: actionTypes.AUTH_TOAST_RESET
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        payload: {
            path: path
        }
    }
}