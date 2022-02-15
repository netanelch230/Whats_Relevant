import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import Words from '../../components/Words';
import {Headline} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {
  removeWordArr,
  removeWord,
  setWordArr,
  setWord,
} from '../../redux/actions/words';

export default function KeyWords() {
  const dispatch = useDispatch();
  const {word, wordItems} = useSelector((state) => state.wordsReducer);

  const handleAddword = () => {
    Keyboard.dismiss();
    dispatch(setWordArr(word));
    dispatch(removeWord());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Key Words:</Text>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled">
        <Words items={wordItems} />
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writewordWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Add Key Words'}
          value={word}
          onChangeText={(text) => dispatch(setWord(text))}
        />
        <TouchableOpacity onPress={() => handleAddword()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  wordsWrapper: {
    padding: 15,
    borderRadius: 15,
    paddingTop: 5,
    paddingHorizontal: 20,
    backgroundColor: '#deded7',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 30,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  items: {
    marginTop: 30,
  },
  writewordWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
