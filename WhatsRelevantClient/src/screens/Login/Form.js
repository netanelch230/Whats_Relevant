import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert, Text} from 'react-native';
import {signup} from '../../redux/actions/login';
import {connect} from 'react-redux';
import LoadingButton from '../../components/LoadingButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import fetchStates from '../../redux/reducers/fetchStates';

function Form(props) {
  const [userName, setUserName] = useState('');
  const [errorInput, setErrorInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const validateForm = () => {
    setErrorInput('');
    if (userName) {
      setIsLoading(!isLoading);
      setDisabled(!disabled);
      signUpFetch({userName});
    } else if (!userName) {
      setErrorInput('Please enter a valid user name');
    }
  };

  const signUpFetch = async ({userName}) => {
    //await props.signup({userName});
    //if (props.login.status !== fetchStates.error) {
    //setErrorInput(props.login.message);
    props.navigation.navigate('QrCode', {userName: userName});
    //} else {
    //setErrorInput('login fetch has failed ,try again!');
    //}
    setIsLoading(false);
    setDisabled(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        label={'Name'}
        style={styles.input}
        onChangeText={setUserName}
        placeholder="Name"
        value={userName}
      />

      <LoadingButton
        onPress={validateForm}
        disabled={disabled}
        isLoading={isLoading}
      />

      {errorInput ? <Text style={{color: 'red'}}> {errorInput} </Text> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 100,
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(({login}) => ({login}), {
  signup,
})(Form);
