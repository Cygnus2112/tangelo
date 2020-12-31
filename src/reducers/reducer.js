const initialState = {
  isFetching: false,
  isLoggedIn: false,
  loginError: '',
  signupError: '',
  user: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loginError: '',
        isFetching: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        loginError: '',
        isFetching: false,
        user: action.user,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoggedIn: false,
        isFetching: false,
        loginError: 'Incorrect username and/or password',
      };
    case 'SIGNUP_REQUEST':
      return {
        ...state,
        isFetching: true,
        signupError: '',
      }
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        isFetching: false,
        signupError: '',
        user: action.user,
      };
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        isLoggedIn: false,
        isFetching: false,
        signupError: 'Error creating account.',
      };
    default:
      return state;
  }
}
