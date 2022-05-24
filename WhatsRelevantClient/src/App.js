import React from 'react';

import Rout from './Router/Rout';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {useSelector} from 'react-redux';
import Form from './screens/Login/Form';
import QrCode from './screens/Login/QrCode';

import {SocketContext, socket} from './config/Socket';
const Stack = createStackNavigator();

const AppWrapper = () => {
  return (
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <App />
        </PersistGate>
      </Provider>
    </SocketContext.Provider>
  );
};

const App = () => {
  const {loggedIn} = useSelector((state) => state.login);
  //console.log('logged In?', loggedIn);
  return (
    <NavigationContainer>
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
        <Stack.Screen
          options={{headerShown: false}}
          name="Rout"
          component={Rout}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppWrapper;
