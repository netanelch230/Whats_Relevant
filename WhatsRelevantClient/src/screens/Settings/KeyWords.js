import React, {useEffect, useState} from 'react';
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
import {fetchAddWords, fetchWords, setWordArr} from '../../redux/actions/words';
import {connect} from 'react-redux';
import {useDispatch} from 'react-redux';
import ModelPopUp from '../../components/ModelPopUp';

const KeyWords = (props) => {
  const dispatch = useDispatch();
  const [word, setWord] = useState('');
  const [message, setMessage] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    props.fetchWords();
  }, []);

  const handleAddword = () => {
    if (word == '') {
      setMessage('invalid Input');
      return setModalVisible(true);
    }

    Keyboard.dismiss();
    //props.fetchAddWords({word});
    dispatch(setWordArr(word));
    setWord('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Key Words:</Text>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled">
        <Words items={props.words.wordItems} />
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writewordWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Add Key  Words'}
          value={word}
          onChangeText={(text) => setWord(text)}
        />
        <TouchableOpacity onPress={() => handleAddword()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <ModelPopUp
        massage={message}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

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
//1.mapStateToProps 2.mapDispatchToProps
export default connect(({words}) => ({words}), {fetchAddWords, fetchWords})(
  KeyWords,
);
