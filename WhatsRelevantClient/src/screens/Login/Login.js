import React from 'react';
import {StyleSheet} from 'react-native';
import {FormItem} from 'react-native-form-component';
import {signup} from '../../redux/actions/login';
import {connect} from 'react-redux';

import Form from './Form';
import QrCode from './QrCode';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

//here we can explnation about the app- in the stack
function Login({navigation}) {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Form"
          component={Form}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="QrCode"
          component={QrCode}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default connect(null, {
  signup,
})(Login);
