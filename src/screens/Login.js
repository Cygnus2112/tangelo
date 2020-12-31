import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, Button } from 'react-native-paper';
import { LOGIN_REQUEST } from '../actions/actions';

const isValidEmail = (email) => {
  const regExString = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExString.test(email);
};

const LoginScreen = ({ navigation }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordVisible, setPasswordVisible ] = useState(false);
  const [ emailValid, setEmailValid ] = useState(false);

  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.isFetching);

  const handleSubmit = () => {
    const info = {
      email,
      password,
    };
    dispatch({
      type: LOGIN_REQUEST,
      info,
      navigation,
    });
  };

  const handleSignupPress = useCallback(() => {
    navigation.navigate('signup');
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
        <View style={styles.container}>
          <View style={{alignSelf: 'flex-end', marginRight: 10}}>
            <Text style={{fontSize: 16, textAlign: 'right', marginVertical: 15}}>
              Don't have an account? <Text onPress={handleSignupPress} style={{color: 'blue', fontWeight: '600'}}>Sign up.</Text>
            </Text>
          </View>
          <Text style={styles.header}>
              Welcome Back
          </Text>
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
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
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
          <Button
            uppercase={false}
            onPress={handleSubmit}
            style={styles.button}
            labelStyle={{fontSize: 18, width: '90%'}}
            disabled={!emailValid || !password}
            mode="contained"
            loading={isFetching}
          >
            Log in
          </Button>
        </View>
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
    width: '80%',
    marginVertical: 15,
    borderRadius: 15,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInner: {
    width: '100%',
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
  },
});

const inputTheme = {
  roundness: 8,
};

export default LoginScreen;
