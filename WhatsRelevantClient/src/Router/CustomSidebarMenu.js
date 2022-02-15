// React Navigation Drawer with Sectioned Menu Options & Footer
// https://aboutreact.com/navigation-drawer-sidebar-menu-with-sectioned-menu-options-footer/

import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, Image} from 'react-native';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

const CustomSidebarMenu = (props) => {
  const {state, descriptors, navigation} = props;
  let lastGroupName = '';
  let newGroup = true;

  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <Image source={require('../../assets/icon.png')} style={{
          padding: 20,
          resizeMode: "contain",
          margin: 35,
        }} />
        {state.routes.map((route, i) => {
          const {drawerLabel, groupName} = descriptors[
            route.key
          ].options;
          if (lastGroupName !== groupName) {
            newGroup = true;
            lastGroupName = groupName;
          } else newGroup = false;
          return (
            <>
              {newGroup ? (
                <View style={styles.sectionContainer}>
                  <Text key={groupName} style={{marginLeft: 16,fontWeight: "bold",fontSize: 15,}}>
                    {groupName}
                  </Text>
                  <View style={styles.sectionLine} />
                </View>
              ) : null}
              <DrawerItem
                key={drawerLabel}
                label={({color}) => <Text style={{color,fontWeight: "bold"}}>{drawerLabel}</Text>}
                focused={
                  state.index ===
                  state.routes.findIndex((e) => e.name === route.name)
                }
                activeTintColor='#000000'
                onPress={() => navigation.navigate(route.name)}
              />
            </>
          );
        })}
      </DrawerContentScrollView>
      <Text style={{fontSize: 16, textAlign: 'center', color: 'grey'}}>
         WhatsRelevant
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sectionLine: {
    backgroundColor: 'gray',
    flex: 1,
    height: 1,
    marginLeft: 10,
    marginRight: 20,
  },shadow: {
    shadowColor: '#202020',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
  },
});

export default CustomSidebarMenu;
