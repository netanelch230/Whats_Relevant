import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
  Linking 
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {setLoggedIn} from '../../redux/actions/login';
import socket from '../../config/Socket';
const {GetGuid} = require('../../config/FileSystem.js');



export default function Login({navigation}) {
  const dispatch = useDispatch();

  const [link, setLink] = useState(null);
  var uuid;
  const onPress = () => {
    dispatch(setLoggedIn(true));
    navigation.navigate('Rout');
  };

  useEffect(() => {
    socket.on('QrCode', (link) => {
      setLink(link);
      console.log(link);
      console.log('setLink');
    });
    console.log('use');
    console.log('Get a guid');
    GetGuid().then((guid) =>{
      console.log("The guid is:",guid);
      socket.emit('join',guid, () => {
        console.log('join');
      });
    })
    
  }, []);

 

  useEffect(() => {
    socket.on('SuccessSession', ({message}) => {
      console.log(message);
      dispatch(setLoggedIn(true));
      navigation.navigate('Rout');
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      {link ? (
        <Text style={styles.baseText}>To register please go to {'\n'}
        <Text style={{color: 'blue'}}
      onPress={() => Linking.openURL(link)}>
          {link}
        </Text>
        {'\n'}on your computer and scan QRCode using{'\n'}
         Linked Devices from inside WhatsApp </Text>
      ) : (
        <Text>Waiting to server</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontFamily: "Roboto",
    width:null,
    resizeMode: 'contain',
    textAlign: 'center',
    lineHeight: 30,
    padding:60,
    fontSize: 20
  },
});
