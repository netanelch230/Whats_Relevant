import React, { useState } from "react";
import CheckBox from '@react-native-community/checkbox';
import { Text, StyleSheet, View } from "react-native";
import socket from "../config/Socket"
const UniqueCheckBox = (props) => {
  let [isSelected, setSelection] = useState();
  React.useEffect(() => {
    setSelection(props.val);
  }, [props.val]);

  return (
    <CheckBox
      value={isSelected}
      onValueChange={setSelection}
      style={styles.checkbox}
      onChange={() => {
        console.log(!isSelected, props.id);
        socket.emit("updateParticipants",props.id,!isSelected);//{"isExist":!isSelected,"id":props.id});
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20
  },
  checkbox: {
    alignSelf: "center"
  },
  label: {
    margin: 8
  }
});

export default UniqueCheckBox;
