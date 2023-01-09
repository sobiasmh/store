import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import Shop from '../Screens/Shop';
import Notification from '../Screens/Notification';
import profile from '../Screens/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import COLORS from '../const/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Discovery from '../Screens/Discovery';
import Cart from '../Screens/Cart';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  
  return (
    <Tab.Navigator
    screenOptions={{
    tabBarStyle: { 
      height:55,
      backgroundColor:COLORS.primary
     },
    
  }}
      tabBarOptions={{
        style: {
          height: 55,
          borderTopWidth: 0,
          elevation: 0,
        },
        showLabel: false,
        activeTintColor: COLORS.black,
        inactiveTintColor:"#634f4f"
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown:false,
          tabBarIcon: ({color}) => (
            <Icon name="home-filled" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown:false,
          headerTitleStyle:{
            fontSize:28,
            fontWeight:"bold",
            color:COLORS.primary

          },
          headerStyle:{
            backgroundColor:COLORS.lightprimary,
            
          },
          tabBarIcon: ({color}) => (
            <FontAwesome name="bell" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="Discovery"
        component={Discovery}
        options={{
          headerShown:false,
          tabBarIcon: ()=> (
            <View
              style={{
                
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf:"center"
              }}>
              <Text style={{fontWeight:"700", fontSize:14, textAlign:"center"}}>DISCOVERY</Text>
            </View>
          ),
        }}
      />
      
      <Tab.Screen
        name="MyCart"
        component={Cart}
        options={{
          headerShown:false,
          tabBarIcon: ({color}) => (
            <FontAwesome name="shopping-bag" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={profile}
        options={{
          headerShown:true,
          headerStyle:{
            backgroundColor:COLORS.primary
          },
          tabBarIcon: ({color}) => (
            <Icon name="person-pin" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;