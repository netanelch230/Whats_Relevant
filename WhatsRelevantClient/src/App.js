import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';

import Rout from './Router/Rout';
import Login from './screens/Login/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {Store} from './redux/store';
import {useSelector} from 'react-redux';
import Participants from './screens/Settings/ChooseParticipants';
import Groups from './screens/Settings/ChooseGroup';

const Stack = createStackNavigator();

const AppWrapper = () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const {loggedIn} = useSelector((state) => state.loginReducer);
  console.log('logged In?', loggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!loggedIn ? (
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
          />
        ) : (
          <Stack.Screen
            options={{headerShown: false}}
            name="Rout"
            component={Rout}
          />
          )
          
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppWrapper;
