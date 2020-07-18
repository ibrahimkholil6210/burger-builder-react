import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            idToken: idToken,
            localId: localId
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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');

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

            const getResponse = await axios.post(url, authData);

            const expirationDate = new Date(new Date().getTime() + getResponse.data.expiresIn * 1000);
            localStorage.setItem('token', getResponse.data.idToken);
            localStorage.setItem('expirationTime', expirationDate);
            localStorage.setItem('userId', getResponse.data.localId);


            dispatch(authSuccess(getResponse.data.idToken, getResponse.data.localId));
            dispatch(authCheckTimeout(getResponse.data.expiresIn));
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

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if (expirationTime > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                const calcDiff = expirationTime.getTime() - new Date().getTime();
                dispatch(authCheckTimeout(calcDiff / 1000));
            } else {
                dispatch(logout());
            }
        }
    }
}

