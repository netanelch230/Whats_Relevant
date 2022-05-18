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
  Button,
  ScrollView,
} from 'react-native';



 import {useSelector} from 'react-redux';
 import socket from '../../config/Socket';
 import Card from '../../components/Card';
 const window = Dimensions.get('window');

export default function Participants() {
  
 const {participants} = useSelector((state) => state.participantsReducer);
  return (
    <ScrollView>
      <FlatList style={{backgroundColor:"FFFFFF"}}
        data={participants}
        renderItem={({item}) => <Card onPress={() => 
          { 
            console.log(item.id);
            socket.emit("chooseParticipant",item.id);
          }
          }image={item.image} name={item.text}/>}
      />
      </ScrollView>
  );

}