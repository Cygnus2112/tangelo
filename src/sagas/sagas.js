import { call, put, all, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../api/api';
import * as actions from '../actions/actions';

function* signup({ info, navigation }) {
  try {
    const { user, token } = yield call(api.signup, info);
    yield call(AsyncStorage.setItem, '@auth_token', token);
    yield call(AsyncStorage.setItem, '@first_name', user.firstName);
    yield call(AsyncStorage.setItem, '@last_name', user.lastName);
    yield put(actions.signupSuccess({user}));
    navigation.reset({
      index: 0,
      routes: [{ name: 'dashboard' }],
    });
  } catch (err) {
    console.log('Signup error: ', err);
  }
}

function* signupSaga() {
  yield takeEvery(actions.SIGNUP_REQUEST, signup);
}

function* login({ info, navigation }) {
  try {
    const { token } = yield call(api.login, info);
    yield call(AsyncStorage.setItem, '@auth_token', token);
    // There's no backend, so just using dummy data for now
    const firstName = yield call(AsyncStorage.getItem, '@first_name');
    const lastName = yield call(AsyncStorage.getItem, '@last_name');
    const user = {
      firstName: firstName || 'John',
      lastName: lastName || 'Appleseed',
    };
    yield put(actions.loginSuccess({user}));
    navigation.reset({
      index: 0,
      routes: [{ name: 'dashboard' }],
    });
  } catch (err) {
    console.log('Login error: ', err);
  }
}

function* loginSaga() {
  yield takeEvery(actions.LOGIN_REQUEST, login);
}

function* authCheck({ navigation }) {
  try {
    const token = yield call(AsyncStorage.getItem, '@auth_token');
    if (token) {
      // There's no backend, so just using dummy data for now
      const firstName = yield call(AsyncStorage.getItem, '@first_name');
      const lastName = yield call(AsyncStorage.getItem, '@last_name');
      const user = {
        firstName: firstName || 'John',
        lastName: lastName || 'Appleseed',
      };
      yield put(actions.loginSuccess({user}));
      navigation.reset({
        index: 0,
        routes: [{ name: 'dashboard' }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'signup' }],
      });
    }
  } catch (err) {
    navigation.reset({
      index: 0,
      routes: [{ name: 'signup' }],
    });
  }
}

function* authCheckSaga() {
  yield takeEvery(actions.AUTH_CHECK, authCheck);
}

function* logout({ navigation }) {
  try {
    yield call(AsyncStorage.removeItem, '@auth_token');
    yield call(AsyncStorage.removeItem, '@first_name');
    yield call(AsyncStorage.removeItem, '@last_name');
    navigation.reset({
      index: 0,
      routes: [{ name: 'login' }],
    });
  } catch (err) {
    navigation.reset({
      index: 0,
      routes: [{ name: 'login' }],
    });
  }
}

function* logoutSaga() {
  yield takeEvery(actions.LOGOUT_REQUEST, logout);
}

export default function* rootSaga() {
  yield all([
    signupSaga(),
    loginSaga(),
    authCheckSaga(),
    logoutSaga(),
  ]);
}
