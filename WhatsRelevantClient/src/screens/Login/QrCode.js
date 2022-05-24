import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, Button, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {setLoggedIn} from '../../redux/actions/login';

import {SocketContext} from '../../config/Socket';

function QrCode({navigation, route}) {
  const socket = React.useContext(SocketContext);
  const dispatch = useDispatch();
  const {userName} = route.params;

  const [image, setImage] = useState(null);
  const onPress = () => {
    socket.emit('join', () => {
      console.log('join');
    });
  };

  useEffect(() => {
    console.log('use');
    console.log(userName);
    socket.emit('join', userName, () => {
      console.log('join');
    });
  }, []);

  useEffect(() => {
    socket.on('QrCode', (img) => {
      setImage(img);
      console.log('setImage');
    });

    socket.on('SuccessSession', ({message, data}) => {
      console.log(message);
      console.log('dtat', data);
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

      <Button onPress={onPress} title="Emit Again" color="#841584" />
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
export default QrCode;
