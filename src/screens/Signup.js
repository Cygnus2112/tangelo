import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { SIGNUP_REQUEST } from '../actions/actions';

const isValidEmail = (email) => {
  const regExString = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExString.test(email);
};

const SignupScreen = ({ navigation }) => {
  const [ email, setEmail ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordVisible, setPasswordVisible ] = useState(false);
  const [ emailValid, setEmailValid ] = useState(false);

  // TODO: Dismiss keyboard on blur
  // TODO: Test password check mark on diff devices
  // TODO: Check for token on startup before transition to Signup

  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.isFetching);

  const handleSubmit = useCallback(() => {
    const info = {
      email,
      firstName,
      lastName,
      password,
    };
    dispatch({
      type: SIGNUP_REQUEST,
      info,
      navigation,
    });
  }, [dispatch, email, firstName, lastName, password, navigation]);

  const handleLoginPress = useCallback(() => {
    navigation.navigate('login');
  }, [navigation]);

  const togglePasswordVisible = useCallback(() => {
    setPasswordVisible(prev => !prev);
  }, []);

  useEffect(() => {
    const isValid = isValidEmail(email);
    setEmailValid(isValid);
  }, [email]);

  return (
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={{alignSelf: 'flex-end', marginRight: 10}}>
            <Text style={{fontSize: 16, textAlign: 'right', marginVertical: 15}}>
              Already have an account? <Text onPress={handleLoginPress} style={{color: 'blue', fontWeight: '600'}}>Log in.</Text>
            </Text>
          </View>
          <Text style={styles.header}>
            Welcome to Tangelo
          </Text>
          <Text style={styles.instructions}>
            Create an account to get started.
          </Text>
          <TextInput
            label="First name"
            value={firstName}
            onChangeText={setFirstName}
            mode="outlined"
            style={styles.input}
            theme={inputTheme}
            disabled={isFetching}
            right={firstName.length > 0 && (
              <TextInput.Icon name="check" color="green" />
            )}
          />
          <TextInput
            label="Last name"
            value={lastName}
            onChangeText={setLastName}
            mode="outlined"
            style={styles.input}
            theme={inputTheme}
            disabled={isFetching}
            right={lastName.length > 0 && (
              <TextInput.Icon name="check" color="green" />
            )}
          />
          <TextInput
            label="Email address"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            theme={inputTheme}
            disabled={isFetching}
            right={emailValid && <TextInput.Icon name="check" color="green" />}
          />
          <TextInput
            label="Password (8+ characters)"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={[styles.input, {marginBottom: 0}]}
            theme={inputTheme}
            secureTextEntry={!passwordVisible}
            disabled={isFetching}
            right={
              <TextInput.Icon
                name={passwordVisible ? "eye-off" : "eye"}
                onPress={togglePasswordVisible}
              />
            }
          />
          <View style={{alignSelf: 'flex-end', height: 30}}>
            {password.length >= 8 && (
              <Icon name="check" size={26} color="green" style={{marginTop: -43, marginRight: 70}} />
            )}
          </View>
          <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
            <Button
              uppercase={false}
              onPress={handleSubmit}
              style={styles.button}
              labelStyle={{fontSize: 18}}
              disabled={!emailValid || !firstName || !lastName || password.length < 8}
              mode="contained"
              loading={isFetching}
            >
              Submit
            </Button>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '86%',
    marginBottom: 15,
    borderRadius: 50,
  },
  button: {
    width: '86%',
    borderRadius: 15,
    height: 45,
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    borderBottomColor: 'black',
    paddingVertical: 15,
    borderBottomWidth: 2,
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 20,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 15,
  },
});

const inputTheme = {
  roundness: 8,
};

export default SignupScreen;
