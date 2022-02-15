import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import { SearchBar } from 'react-native-elements';

export default function SearchBarcomp(prop) {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <SearchBar
        lightTheme
        labelStyle={{backgroundColor: 'white'}}
        placeholder="Type Here...."
        inputContainerStyle={{backgroundColor: 'white'}}
        value={search}
        onChangeText={(text) => setSearch(text)}
        onSubmitEditing={(e) => prop.handlerFunc(e.nativeEvent.text)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius:25 ,
  },
});
