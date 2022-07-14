import React, { useEffect } from 'react';
import { Alert } from 'react-native';
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
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
const Stack = createStackNavigator();

const AppWrapper = () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};

const createChannels=()=>{
  PushNotification.createChannel(
    {
      channelId: "test-channel",
      channelName: "Test Channel"
    }
  )
}



const App = () => {

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  useEffect(() => {
    createChannels();
  //   // const unsubscribe = messaging().onMessage(async remoteMessage => {
  //   //   console.log("I got a message",JSON.stringify(remoteMessage));
  //   //   //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   //   //handleNotification("Netanel Kahanyan");
  //   // });
  //   return unsubscribe;
  },[]);
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
