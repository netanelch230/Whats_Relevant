import React from "react";
import { View, Image, StyleSheet,Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    padding:30
  },
  logo: {
    width: null,
    resizeMode: 'contain',
    height: 120
    
  },
  baseText: {
    fontFamily: "Roboto",
    width:null,
    resizeMode: 'contain',
    textAlign: 'center',
    lineHeight: 30,
    padding:30
  },
});

const About = ({ navigation }) => {
  const onPressHandler = () => {
    navigation.toggleDrawer();
}
  
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../Image/Whats relevant logo.png') }
      />
     <Text style={styles.baseText}>
      Hey, we are WhatsRelevant!{'\n'}
      So, what do we offer?{'\n'}
      A platform which allows our users to save time excessively spent in Whatsapp,{'\n'}
      We classified relevant messages from WhatsApp groups, and alert our users when recived.{'\n'}{'\n'}
      YES!! We do this for you :){'\n'}
      So simple, dont you think?{'\n'}
    </Text>
    <Text style={styles.baseText}>
    {'\u00A9 '}
      All righs reserved to: {'\n'}
      Rina Shushan, Yair Gabay and Netanel Kahanyan
      </Text>
      
    </View>
  );
};

export default About;
