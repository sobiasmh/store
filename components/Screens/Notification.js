import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Image,
    Button,
    Pressable,
    TextInput,
    ScrollView,
    FlatList,
    Modal,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Entypo from 'react-native-vector-icons/Entypo';
import COLORS from '../const/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';



export default ({ navigation }) => {
    const [notification, setnotification] = useState([])
    const [getcondition, setcondition] = useState(true)
    const getnotifi = () => {
        fetch(
            "https://store-5d6ee-default-rtdb.firebaseio.com/Notification.json",
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((responsejson) => {
                // var res = responsejson.filter(e => {
                //     return e != null
                // })
                let samplearray = [];
                for (key in responsejson) {
                  if (notification.length == 0) {
                    samplearray.push(responsejson[key]);
                  } else {
                    samplearray.push(responsejson[key]);
                  }
                }
                setnotification(samplearray);
               
                setcondition(false)



            })
            .catch((err) => {
                console.error(err);
            });


    };





    useEffect(() => {
        getnotifi();
    }, []);
    if (getcondition) {
        return (
            <View style={[styles.container, { backgroundColor: COLORS.black }]}>
                <ActivityIndicator size="large" />

                <Text>Waiting for response</Text>
            </View>
        );
    }


    return (
        <View style={[styles.container,{backgroundColor:COLORS.black}]}>
           <Text style={styles.text1}>
                    Notification
                </Text>
                <FlatList
                    data={notification}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ width: 350, height: 240, borderBottomWidth:1, borderBottomColor:COLORS.primary}}>
                                <ImageBackground source={{uri:item.image}} blurRadius={7} resizeMode="cover" style={{width:"100%", height:230}}>

                                <View style={{flexDirection:"row", justifyContent:'flex-start'}}>
                                    <View style={{backgroundColor:COLORS.white, height:80, width:80, borderRadius:50, margin:10}}>
                                        <Text style={{color:COLORS.black, fontSize:26, fontWeight:"700", alignSelf:"center", margin:20}}>{item.user}</Text>
                                    </View>
                                    <Text style={{marginTop:30, letterSpacing:3, fontSize:20, fontWeight:"700"}}>{item.title}</Text>
                                </View>
                                <Text style={{fontSize:17, fontWeight:"600", margin:10, marginLeft:20, color:COLORS.white}}>{item.content}</Text>
                                </ImageBackground>
                            </View>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />

        </View>
    )





};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text1: {
        letterSpacing: 3,
        fontSize: 20,
        fontWeight: "400",
        color: COLORS.white,
        margin: 20,
        alignSelf:"flex-start",
        marginTop: 40
    },

});