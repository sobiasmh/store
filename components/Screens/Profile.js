import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Settings } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import COLORS from '../const/colors';
import Setting from './Setting';
import About from './About';

export default ({ navigation }) => {
    const Tab = createMaterialTopTabNavigator();

    


    return (
        <Tab.Navigator

        screenOptions={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarLabelStyle: {
            fontSize: 15,
            color: COLORS.black,
          },
          tabBarItemStyle: { height: 60 },
          tabBarIndicatorStyle: { backgroundColor: COLORS.black, height: 3 },
          swipeEnabled: true
        }}>
        <Tab.Screen name="Setting" component={Setting} />
        <Tab.Screen name="About" component={About} />
  
  
  
      </Tab.Navigator>
    )





};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});