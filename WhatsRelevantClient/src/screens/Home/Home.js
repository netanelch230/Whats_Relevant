import React, {useEffect} from 'react';
import socket from '../../config/Socket';
import {StyleSheet, View, Text, Button} from 'react-native';

import MessagesScreen from './MessgaeCard';
import {useSelector, useDispatch} from 'react-redux';
import {addMessage} from '../../redux/actions/messages';
import { addGroup } from '../../redux/actions/group';
import { addparticipants } from '../../redux/actions/participants';

var today = new Date();

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*const firebaseConfig = {
  apiKey: "AIzaSyA4EoRLg_G71A5QM5XTX2AmnBR3ezHeqOA",
  authDomain: "whatsrelevant-edeeb.firebaseapp.com",
  projectId: "whatsrelevant-edeeb",
  storageBucket: "whatsrelevant-edeeb.appspot.com",
  messagingSenderId: "517063917219",
  appId: "1:517063917219:web:cce54fe9add431342d4916",
  measurementId: "G-N4ZDL5XT0E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);*/


export default function Home({navigation}) {
  //need to add when conection lost => login page
   const dispatch = useDispatch();
  
  useEffect(() => {
    socket.on('group', ({image, name:text,id}) => {
      console.log("I got a group");
      
      dispatch(addGroup({image,text,id}));
    });

    socket.on('participants', (participants) => {
      console.log("I got participant");
      console.log(participants);
      //console.log(participants.participants);
      dispatch(addparticipants(participants));
    });

    socket.on('message', ({imageProfile, body, notifyName, timeStamp:id,timeOfMessage,reason,isContact}) => {
      console.log("I get a message");
      let eurl=imageProfile;
      dispatch(addMessage({eurl, body, notifyName, id, timeOfMessage,reason,isContact}));
    });
  });

  return (
    <MessagesScreen  />
    // {/* <SearchBarcomp handlerFunc={searchHandler} /> */}
    // {/* <SearchList /> */}
  );
}

