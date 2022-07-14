import React from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import CheckboxList from 'rn-checkbox-list';


 import {useSelector} from 'react-redux';
 import socket from '../../config/Socket';
 import Card from '../../components/Card';
 const window = Dimensions.get('window');

export default function Participants() {
  
 const {participants} = useSelector((state) => state.participantsReducer);

  return (
    <ScrollView>
     <FlatList
        style={{ backgroundColor: "FFFFFF" }}
        data={participants}
        renderItem={({ item }) => <Card id={item.id} checkBox={true} name={item.text} val={item.isExist} image={item.image} />}
      />
      </ScrollView>
  );

}