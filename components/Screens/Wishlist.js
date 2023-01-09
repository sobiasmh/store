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
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Entypo from 'react-native-vector-icons/Entypo';
import COLORS from '../const/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import uuid from 'react-native-uuid';


export default ({ navigation }) => {
    const [cartData, setcartData] = useState([])
    const [getcondition, setcondition] = React.useState(true);
    const [getprod, setpord] = useState(false)
    


    const getproduct = () => {
        fetch(
            "https://store-5d6ee-default-rtdb.firebaseio.com/Wishlist.json",
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
                  if (cartData.length == 0) {
                    samplearray.push(responsejson[key]);
                  } else {
                    samplearray.push(responsejson[key]);
                  }
                }
                setcartData(samplearray);
                
                setpord(true)
                setcondition(false)



            })
            .catch((err) => {
                console.error(err);
            });


    };





    useEffect(() => {
        getproduct();
    }, [getcondition]);
    if (getcondition) {
        return (
            <View style={[styles.container, { backgroundColor: COLORS.black }]}>
                <ActivityIndicator size="large" />

                <Text>Waiting for response</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: COLORS.black }]}>
                <View style={styles.header}>
                    <Icons name="cart" size={28} onPress={navigation.goBack} color={COLORS.primary}
                    />
                    <Text style={{
                        fontSize: 25, fontWeight: 'bold', color: COLORS.primary
                    }}>My Wishlist</Text>
                </View>


                {cartData?.length>0? (
                    <View >
                        <View style={{ height: "80%" }}>

                            <FlatList

                                data={cartData}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={styles.cartCard} key={item.key}>

                                            <Image source={{ uri: item.image }} style={{ marginLeft: 30, height: 100, width: 100 }} />

                                            <View
                                                style={{
                                                    height: 100,
                                                    marginLeft: 50,
                                                    paddingVertical: 10,
                                                }}>
                                                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: COLORS.white, marginRight: 30 }}>{item.name}</Text>

                                                   

                                                </View>
                                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: COLORS.white }}>$ {item.price}</Text>
                                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: COLORS.primary }}>{item.category}</Text>
                                                
                                            </View>

                                        </View>
                                    )
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                       

                    </View>





                ) : (

                    <View
                        style={{
                            height: 600,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View style={{ height: 100, width: 100, backgroundColor: COLORS.white, borderRadius: 50, margin: 40, marginBottom: 20 }}>
                            <Entypo name="shopping-bag" size={50} style={{ padding: 20, alignSelf: "center" }} color={COLORS.primary} />
                        </View>


                        <Text style={{ color: COLORS.white, fontSize: 17, textAlign: 'center', fontWeight: "500" }}>
                            You have nothing in Wislist!
                        </Text>
                        <Text style={{ marginBottom: 230, color: '#333', fontSize: 15, textAlign: 'center', color: COLORS.primary, padding: 9, margin: 13 }}>
                            Please continue shopping to see your products here!
                        </Text>
                        <TouchableOpacity
                            style={{
                                width: 400,
                                height: 80,
                                backgroundColor: COLORS.primary,
                                marginTop: 10,
                            }}

                            onPress={() => {
                            }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: "700",
                                alignSelf: "center",
                                justifyContent: "center",
                                padding: 20
                            }}>
                                SHOP NOW
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}



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
    header: {
        paddingVertical: 30,
        flexDirection: 'row',
        alignSelf: "flex-start",
        marginLeft: 20,
        marginTop: 20,

    },
    cartCard: {
        height: 200,
        backgroundColor: COLORS.black,
        marginVertical: 5,
        paddingHorizontal: 4,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: COLORS.white
    },


});