import React from "react";
import { View, Text, Image,StyleSheet,FlatList,TouchableOpacity,SafeAreaView } from "react-native";

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f7f7f7',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,

  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
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
  mblTxt: {
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
    marginLeft: 15,
  },
});

const Card = props => (
  <TouchableOpacity
  onPress={props.onPress}
  >
    <View style={styles.row}>
      <Image source={props.image !== undefined ? {uri: props.image} : require('../Image/defualtImage.png')} style={styles.pic} />
      <View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.name}</Text>
        </View>
        <View style={styles.msgContainer}>
          <Text style={styles.msgTxt}>{props.status}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);
export default Card;