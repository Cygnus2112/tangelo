export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const AUTH_CHECK = 'AUTH_CHECK';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export const signupSuccess = ({ user }) => {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
};

export const signupFailure = () => {
  return {
    type: SIGNUP_FAILURE,
  };
};

export const loginSuccess = ({ user }) => {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};

export const loginFailure = () => {
  return {
    type: LOGIN_FAILURE,
  };
};
