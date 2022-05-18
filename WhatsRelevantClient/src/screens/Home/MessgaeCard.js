

import React, {useState} from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  View,
  Image,
  Text
} from 'react-native';

import {useSelector} from 'react-redux';

const Row = props => (
    <View style={styles.row}>
      <Image source={{ uri: props.image }} style={styles.pic} />
      <View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.name + "  |  "+props.group}</Text>
          <Text style={styles.time}>{props.time}</Text>
        </View>
        <View style={styles.msgContainer}>
          <Image
            name={props.icon} size={15} color="#b3b3b3"
            style={{ marginLeft: 15, marginRight: 5 }}
          />
          <Text style={styles.msgTxt}>{props.message}</Text>
        </View>
      </View>
    </View>

);



const MessagesScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {messages} = useSelector((state) => state.messageReducer);
  return (
    <ScrollView>
    <FlatList
      data={messages}
      renderItem={({item}) => <Row
        image={item.imageProfile} name={item.sender} message = {item.body} time={item.timeStamp} group={item.group}/>}
    />
    </ScrollView>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f7f7f7',
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,

  },
  time: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
  },
});
