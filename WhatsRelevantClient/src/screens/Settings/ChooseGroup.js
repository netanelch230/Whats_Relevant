/**
 * Sample React Native App
 * httpss://github.com/facebook/react-native
 * @flow
 */

 import React from 'react';
 import {
   Dimensions,
   ScrollView,
   FlatList
 } from 'react-native';
  import {useSelector} from 'react-redux';
  import socket from '../../config/Socket';
  import { useNavigation } from '@react-navigation/native';
  import Card from '../../components/Card';
  const window = Dimensions.get('window');
 
 export default function Groups() {

  const {groups} = useSelector((state) => state.groupReducer);
  console.log(groups);
  const navigation = useNavigation(); 


  return (
    <ScrollView>
      <FlatList style={{backgroundColor:"FFFFFF"}}
        data={groups}
        renderItem={({item}) => <Card onPress={() => 
          { 
            console.log(item.id);
            socket.emit("ChooseGroup",item.id);
            navigation.navigate('Participants');
          }}
          image={item.image} name={item.name}/>}
      />
      </ScrollView>
    
  );
  
}