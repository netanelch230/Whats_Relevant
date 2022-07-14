import React, {useEffect} from 'react';
import socket from '../../config/Socket';
import {StyleSheet, View, Text, Button} from 'react-native';

import MessagesScreen from './MessgaeCard';
import Groups from '../Settings/ChooseGroup';
import {useSelector, useDispatch} from 'react-redux';
import {addMessage} from '../../redux/actions/messages';
import { addGroup } from '../../redux/actions/group';
import { addparticipants } from '../../redux/actions/participants';
import {setWordArr} from '../../redux/actions/words'
import PushNotification from "react-native-push-notification";
var today = new Date();

const handleNotification=(body,sender,group, imageProfile)=>{
  PushNotification.localNotification({
    channelId: "test-channel",
    title: group+" : "+sender,
    message: body,
    largeIcon:imageProfile
    
  })
}

export default function Home({navigation}) {
  //need to add when conection lost => login page
   const dispatch = useDispatch();
  
  useEffect(() => {
    socket.on('Groups', (groups) => {
      console.log("I got a groups");
      dispatch(addGroup(groups));
    });

    socket.on('words',(words) => {
      console.log("I got words");
      console.log(words);
      dispatch(setWordArr(words));
    })

    socket.on('participants', (participants) => {
      console.log("I got participant");
      dispatch(addparticipants(participants));
    });

    socket.on('message', ({imageProfile, body, sender,timeStamp,reason,isContact,group}) => {
      console.log("I get a message");
      dispatch(addMessage({imageProfile, body, sender,timeStamp,reason,isContact,group}));
      handleNotification(body,sender,group,imageProfile);
    });

    socket.on('phoneNumber', ({ content, to }) => {
      console.log("Hey, we are here!")
      console.log(content, to);
    });
  });

  return (
    <MessagesScreen  />
    // {/* <SearchBarcomp handlerFunc={searchHandler} /> */}
    // {/* <SearchList /> */}
  );
}

