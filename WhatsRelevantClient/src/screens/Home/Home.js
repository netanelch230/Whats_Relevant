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
var today = new Date();


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
    });
  });

  return (
    <MessagesScreen  />
    // {/* <SearchBarcomp handlerFunc={searchHandler} /> */}
    // {/* <SearchList /> */}
  );
}

