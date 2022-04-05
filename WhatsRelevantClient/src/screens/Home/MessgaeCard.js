
/*
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
*/

/**
 * Sample React Native App
 * httpss://github.com/facebook/react-native
 * @flow
 */

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
 } from 'react-native';
 import SortableList from 'react-native-sortable-list';
 
  import {useSelector} from 'react-redux';
  import socket from '../../config/Socket';
  import { useNavigation } from '@react-navigation/native';
import Participants from '../Settings/ChooseParticipants';
  const window = Dimensions.get('window');
 
 export default function Groups() {
 
  const {groups} = useSelector((state) => state.groupReducer);
  console.log(groups);
  const navigation = useNavigation(); 
  _renderRow = ({data, active}) => {
    return <Row data={data} active={active} />
  }

  _chooseGroup = (key) =>
  {
    console.log("I choose a group" + groups[key]);
    console.log("The id is: "+groups[key].id);
    socket.emit("ChooseGroup",groups[key].id);
    navigation.navigate('Participants');
  }

  return (
    <View style={styles.container}>
         <Text style={styles.title}>Press on group to choose your favorite participants</Text>
         <SortableList
           style={styles.list}
           contentContainerStyle={styles.contentContainer}
           data={groups}
           onPressRow={this._chooseGroup}
           renderRow={this._renderRow} />
       </View>
  );
  
}


 class Row extends Component {
 
   constructor(props) {
     super(props);
 
     this._active = new Animated.Value(0);
 
     this._style = {
       ...Platform.select({
         ios: {
           transform: [{
             scale: this._active.interpolate({
               inputRange: [0, 1],
               outputRange: [1, 1.1],
             }),
           }],
           shadowRadius: this._active.interpolate({
             inputRange: [0, 1],
             outputRange: [2, 10],
           }),
         },
 
         android: {
           transform: [{
             scale: this._active.interpolate({
               inputRange: [0, 1],
               outputRange: [1, 1.07],
             }),
           }],
           elevation: this._active.interpolate({
             inputRange: [0, 1],
             outputRange: [2, 6],
           }),
         },
       })
     };
   }
 
   componentWillReceiveProps(nextProps) {
     if (this.props.active !== nextProps.active) {
       Animated.timing(this._active, {
         duration: 300,
         easing: Easing.bounce,
         toValue: Number(nextProps.active),
       }).start();
     }
   }
 
   render() {
    const {data, active} = this.props;
 
     return (
       <Animated.View style={[
         styles.row,
         this._style,
       ]}>
         <Image source={{uri: data.image}} style={styles.image} />
         <Text style={styles.text}>{data.text}</Text>
       </Animated.View>
     );
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#eee',
 
     ...Platform.select({
       ios: {
         paddingTop: 20,
       },
     }),
   },
 
   title: {
     fontSize: 20,
     paddingVertical: 20,
     color: '#999999',
   },
 
   list: {
     flex: 1,
   },
 
   contentContainer: {
     width: window.width,
 
     ...Platform.select({
       ios: {
         paddingHorizontal: 30,
       },
 
       android: {
         paddingHorizontal: 0,
       }
     })
   },
 
   row: {
     flexDirection: 'row',
     alignItems: 'center',
     backgroundColor: '#fff',
     padding: 16,
     height: 80,
     flex: 1,
     marginTop: 7,
     marginBottom: 12,
     borderRadius: 4,
 
 
     ...Platform.select({
       ios: {
         width: window.width - 30 * 2,
         shadowColor: 'rgba(0,0,0,0.2)',
         shadowOpacity: 1,
         shadowOffset: {height: 2, width: 2},
         shadowRadius: 2,
       },
 
       android: {
         width: window.width - 30 * 2,
         elevation: 0,
         marginHorizontal: 30,
       },
     })
   },
 
   image: {
     width: 50,
     height: 50,
     marginRight: 30,
     borderRadius: 25,
   },
 
   text: {
     fontSize: 24,
     color: '#222222',
   },
 });
 