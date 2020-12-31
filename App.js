 /* eslint-disable */ 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from './src/screens/Login';
import SignupScreen from './src/screens/Signup';
import DashboardScreen from './src/screens/Dashboard';
import AccountScreen from './src/screens/Account';
import LoadingScreen from './src/screens/Loading';

import rootReducer from './src/reducers/reducer';
import rootSaga from './src/sagas/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const fade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Dashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = 'format-list-bulleted';
          } else {
            iconName = 'account';
          } 
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        labelStyle: {
          fontSize: 14,
        },
      }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

const App: () => React$Node = () => {
  return (
    <>
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator headerMode={'none'}>
              <Stack.Screen
                name="loading"
                component={LoadingScreen}
                options={{ animationEnabled: true, cardStyleInterpolator: fade }}
              />
              <Stack.Screen
                name="signup"
                component={SignupScreen}
                options={{ animationEnabled: true, cardStyleInterpolator: fade }}
              />
              <Stack.Screen
                name="login"
                component={LoginScreen}
                options={{ animationEnabled: false }}
              />
              <Stack.Screen
                name="dashboard"
                component={Dashboard}
                options={{ animationEnabled: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </>
  );
};

export default App;

