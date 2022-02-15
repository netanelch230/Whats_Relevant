import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';

import {useSelector} from 'react-redux';

const MessagesScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = () => {
  //   console.log('_onRefresh');
  //   setRefreshing(true);
  
  // };

  const {messages} = useSelector((state) => state.messageReducer);
  return (
    <View style={styles.Container}>
      <FlatList
        data={messages}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}
        //     tintColor="#F8852D"
        //   />
        // }
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity>
            <View style={styles.Card}>
              <View style={styles.UserImgWrapper}>
                <Image style={styles.UserImg} source={{uri: item.eurl}} />
              </View>
              <View style={styles.TextSection}>
                <View style={styles.UserInfoText}>
                  <Text style={styles.UserName}>{item.notifyName}</Text>
                  <Text style={styles.PostTime}>{item.timeOfMessage}</Text>
                </View>
                <Text style={styles.MessageText}>{item.body}</Text>
                <Text style={styles.MessageText}>{item.reason}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  Card: {
    // flex: 1,
  },
  UserInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  UserImgWrapper: {
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 5,
  },
  UserImg: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  UserInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  UserName: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular',
  },
  PostTime: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Lato-Regular',
  },
  MessageText: {
    fontSize: 14,
    color: '#333333',
  },
  TextSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 0,
    marginLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#cccccc',
  },
});
