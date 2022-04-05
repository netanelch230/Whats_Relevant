import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
  FlatList,
  Button
} from 'react-native';



 import {useSelector} from 'react-redux';
 import socket from '../../config/Socket';
 const window = Dimensions.get('window');

 const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});



export default function Participants() {
  
 const {participants} = useSelector((state) => state.participantsReducer);
  return (
    <View style={styles.container}>
      <FlatList
        data={participants}
        renderItem={({item}) => <Button onPress={() => 
          { 
            console.log(item.id);
            socket.emit("chooseParticipant",item.id);
          }
          }title={item.text}/>}
      />
    </View>
  );


}