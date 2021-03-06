import 'react-native-gesture-handler';

import * as React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomSidebarMenu from './CustomSidebarMenu';
import Home from '../screens/Home/Home';
import About from '../screens/About/About';
import KeyWords from '../screens/Settings/KeyWords';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Participants from '../screens/Settings/ChooseParticipants';
import Groups from '../screens/Settings/ChooseGroup';
import Socket from '../config/Socket';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};

const ReturnHomePage = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.navigate(props.rout);
  };
  return (
    <TouchableOpacity onPress={toggleDrawer}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name="home" size={20} />
      </View>
    </TouchableOpacity>
  );
};

function HomeStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home', //Set Header Title

          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#37b3e0', //Set Header color
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}
function SetGroupsAndMembers({navigation}) {
  Socket.emit('GetAllGroups');
  return (
    <Stack.Navigator
      initialRouteName="Groups"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerRight: () => (
          <ReturnHomePage navigationProps={navigation} rout={'Home'} />
        ),
        headerStyle: {
          backgroundColor: '#37b3e0', //Set Header color
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Groups"
        component={Groups}
        options={{
          title: 'Groups And Members', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
  
}
function ParticipantsStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Participants">
      <Stack.Screen
        name="Participants"
        component={Participants}
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#37b3e0', //Set Header color
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}
function KeyWordsSet({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="KeyWords"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerRight: () => (
          <ReturnHomePage navigationProps={navigation} rout={'Home'} />
        ),
        headerStyle: {
          backgroundColor: '#37b3e0', //Set Header color
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="KeyWords"
        component={KeyWords}
        options={{
          title: 'Key Words', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}
function SetAbout({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="About"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerRight: () => (
          <ReturnHomePage navigationProps={navigation} rout={'Home'} />
        ),
        headerStyle: {
          backgroundColor: '#37b3e0', //Set Header color
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="About"
        component={About}
        options={{
          title: 'About', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

function Rout() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        // For setting Custom Sidebar Menu
        drawerContent={(props) => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: 'Home Page',
            // Section/Group Name
            groupName: 'Home',
          }}
          component={HomeStack}
        />
        <Drawer.Screen
          name="KeyWords"
          options={{
            drawerLabel: 'Select Key Words',
            // Section/Group Name
            groupName: 'Settings',
          }}
          component={KeyWordsSet}
        />
        <Drawer.Screen
          name="Groups"
          options={{
            drawerLabel: 'Select Groups And Members',
            // Section/Group Name
            groupName: 'Settings',
          }}
          component={SetGroupsAndMembers}
        />
        <Drawer.Screen
          name="About"
          options={{
            drawerLabel: 'About',
            // Section/Group Name
            groupName: 'Settings',
          }}
          component={SetAbout}
        />
        <Drawer.Screen
          name="Participants"
          component={ParticipantsStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    padding: 15,
    marginTop: 5,
    marginLeft: 2,
  },
  header: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: '#f4511e',
  },
});

export default Rout;
