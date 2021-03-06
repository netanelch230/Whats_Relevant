import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ListItem, Icon} from 'react-native-elements';

import {useSelector, useDispatch} from 'react-redux';
import {removeWordArr} from '../redux/actions/words';
import socket from '../config/Socket';

const Words = (props) => {
  const [swip, setSwip] = useState(false);
  const dispatch = useDispatch();

  const deleteWord = (item) => {
    socket.emit("RemoveWord",item);
  };
  const searchWord=(index) => {
    console.log(index);
    
  }

  return props.items.map((item, index) => {
    return (
      <ListItem.Swipeable
        key
        rightWidth={60}
        swipingCheck={(swiping) => setSwip(swiping)}
        bottomDivider={true}
        key={index}
        leftContent={
          <Button
            title="Search"
            icon={{name: 'delete', color: 'white'}}
            buttonStyle={{ minHeight: '100%' }}
            onPress={()=>searchWord(index)}
          />
        }
        rightContent={
          <TouchableOpacity key={item} onPress={() => deleteWord(item)}>
            <FontAwesome5 name="trash-alt" size={50} color={'#999999'} />
          </TouchableOpacity>
        }>
        <Icon name={item.icon} />
        <ListItem.Content>
          <ListItem.Title style={styles.text}>{item}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginTop: 20,
    borderTopWidth: 1,
    //borderColor: colors.greyOutline,
  },
  text: {
    marginRight: 5,
    fontSize: 20,
  },
});

export default Words;
