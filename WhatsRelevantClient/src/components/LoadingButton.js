import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

export default function LoadingButton(props) {
  const toggleLoading = () => {
    props.onPress();
  };

  return (
    <TouchableOpacity disabled={props.disabled} onPress={toggleLoading}>
      <View
        style={{
          ...styles.button,
          backgroundColor: props.isLoading ? '#4caf50' : '#8bc34a',
        }}>
        {props.isLoading && <ActivityIndicator size="large" color="yellow" />}
        <Text style={styles.buttonText}>
          {props.isLoading ? 'Loading...' : 'Submit'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 240,
    height: 70,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
