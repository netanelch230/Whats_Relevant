import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {setLoggedIn} from '../../redux/actions/login';
import socket from '../../config/Socket';
const {GetGuid} = require('../../config/FileSystem.js');



export default function Login({navigation}) {
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  var uuid;
  const onPress = () => {
    dispatch(setLoggedIn(true));
    navigation.navigate('Rout');
  };

  useEffect(() => {
    socket.on('QrCode', (img) => {
      setImage(img);
      console.log('setImage');
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
      <Text>This is the qr code scan page!</Text>
      {image ? (
        <Image style={{width: 300, height: 300}} source={{uri: image}} />
      ) : (
        <Text>loading QrCode....</Text>
      )}

      <Button onPress={onPress} title="OK" color="#841584" />
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
});
