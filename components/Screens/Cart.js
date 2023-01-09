import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Settings } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import COLORS from '../const/colors';
import Wishlist from './Wishlist';
import Shop from './Shop';
export default ({ navigation }) => {
    const Tab = createMaterialTopTabNavigator();

    


    return (
        <Tab.Navigator

        screenOptions={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarLabelStyle: {
            fontSize: 15,
            color: COLORS.primary,
          },
          tabBarItemStyle: { height: 60 },
          tabBarStyle: { backgroundColor: COLORS.black},

          tabBarIndicatorStyle: { backgroundColor: COLORS.primary, height: 3 },
          swipeEnabled: true
        }}>
        <Tab.Screen name="Cart" component={Shop} />
        <Tab.Screen name="Wishlist" component={Wishlist} />
  
  
  
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