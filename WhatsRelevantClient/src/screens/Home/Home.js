import React, {useEffect} from 'react';
//import socket from '../../config/Socket';
import {StyleSheet, View, Text, Button} from 'react-native';

import MessagesScreen from './MessgaeCard';
import {useSelector, useDispatch} from 'react-redux';
import {addMessage} from '../../redux/actions/messages';
var today = new Date();

import {SocketContext} from '../../config/Socket';



export default function Home({navigation}) {
  //need to add when conection lost => login page
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on(
      'message',
      ({
        imageProfile,
        body,
        notifyName,
        timeStamp: id,
        timeOfMessage,
        reason,
        isContact,
      }) => {
        console.log('I get a message');
        let eurl = imageProfile;
        dispatch(
          addMessage({
            eurl,
            body,
            notifyName,
            id,
            timeOfMessage,
            reason,
            isContact,
          }),
        );
      },
    );
  });

  return (
    <MessagesScreen />
    // {/* <SearchBarcomp handlerFunc={searchHandler} /> */}
    // {/* <SearchList /> */}
  );
}
