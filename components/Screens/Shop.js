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
import AsyncStorage from '@react-native-community/async-storage';




export default ({ navigation }) => {
    const Stack = createNativeStackNavigator();
    const [cartData, setcartData] = useState([])
    const [getcondition, setcondition] = React.useState(true);
    const [getprod, setpord] = useState(false)
    const [totalPrice, settotalPrice] = useState()
    const [token, settoken] = useState()
    const [userdata, setuserdata] = useState([])
    const [loggeduser, setloggeduser] = useState()

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('userID');
          if (value !== null) {
            // We have data!!
            settoken(value)
          }
        } catch (error) {
          // Error retrieving data
        }
      };

      const getuser = () => {
        fetch(
            `https://store-5d6ee-default-rtdb.firebaseio.com/Users.json`,
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((responsejson) => {
                let samplearray = [];
            for (key in responsejson) {
              if (userdata.length == 0) {
                samplearray.push(responsejson[key]);
              } else {
                samplearray.push(responsejson[key]);
              }
            }
                setuserdata(samplearray)

                userdata?.map((user,i)=>{
                    if(user.email === token){

                        setloggeduser(user)
                      
                        
                        
                    }
                })
                setcondition(false)

                    

            })
            .catch((err) => {
                console.error(err);
            });

            
    };



    const getproduct = () => {
        fetch(
            "https://store-5d6ee-default-rtdb.firebaseio.com/Cart.json",
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
                settotalPrice(cartData.reduce(
                    (total, item) => total + item.price,
                    0,
                ))
                setpord(true)
                setcondition(false)
                console.log(cartData)



            })
            .catch((err) => {
                console.error(err);
            });


    };





    useEffect(() => {
        getproduct();

        _retrieveData()
        getuser()
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



    const UserCart = () => {

        const [wish, setwish] = useState()
        useEffect(() => {

        }, [cartData])
        const sendreq = (ID) => {
            setcondition(true)

            var reqOptions = {
                method: 'DELETE',


            };

            fetch(
                `https://store-5d6ee-default-rtdb.firebaseio.com/Cart/${ID}.json`,
                reqOptions
            )
                .then((res) => console.log(res))
                .then((result) => {
                    setcondition(false)
                    ToastAndroid.showWithGravityAndOffset(
                        "Deleted Successfully!",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    )

                }
                )
                .catch((error) =>
                    console.log(error)
                );
        }
        const send = (ID, name, image, price) => {

            var reqOptions = {
                method: 'PUT',
                body: JSON.stringify({
                    ID: ID,
                    userID: 12342,
                    name: name,
                    image: image,
                    price: price,

                }),


            };

            fetch(
                `https://store-5d6ee-default-rtdb.firebaseio.com/Wishlist/${ID}.json`,
                reqOptions
            )
                .then((res) => console.log(res))
                .then((result) => {
                    setwish(true)
                    ToastAndroid.showWithGravityAndOffset(
                        "Added Successfully!",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    )

                }
                )
                .catch((error) =>
                    console.log(error)
                );
        }


        return (
            <View style={[styles.container, { backgroundColor: COLORS.black }]}>
                <View style={styles.header}>
                    <Icons name="cart" size={28} onPress={navigation.goBack} color={COLORS.primary}
                    />
                    <Text style={{
                        fontSize: 25, fontWeight: 'bold', color: COLORS.primary
                    }}>My Cart</Text>
                </View>


                {getprod ? (
                    <View >
                        <View style={{ height: "80%" }}>

                            <FlatList

                                data={cartData}
                                extraData={cartData}
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

                                                    <Entypo name="circle-with-cross" size={25} style={{ padding: 5 }} color={COLORS.white}
                                                        onPress={() => { sendreq(item.ID) }} />

                                                </View>
                                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: COLORS.white }}>$ {item.price}</Text>
                                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: COLORS.primary }}>{item.category}</Text>
                                                {wish ?
                                                    <TouchableOpacity style={{ borderWidth: 1, backgroundColor: COLORS.primary, borderColor: COLORS.primary, height: 40, width: 110, borderRadius: 5, alignSelf: "flex-start" }}>
                                                        <Text style={{ color: COLORS.black, fontSize: 14, fontWeight: "400", alignSelf: "center", padding: 4 }}>
                                                            Moved
                                                        </Text>

                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity style={{ borderWidth: 1, borderColor: COLORS.white, height: 40, width: 110, borderRadius: 5, alignSelf: "flex-start" }}
                                                        onPress={() => { send(item.ID, item.name, item.image, item.price) }}>
                                                        <Text style={{ color: COLORS.white, fontSize: 14, fontWeight: "400", alignSelf: "center", padding: 4 }}>
                                                            Move Whitelist
                                                        </Text>

                                                    </TouchableOpacity>}
                                            </View>

                                        </View>
                                    )
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <TouchableOpacity
                            style={{
                                width: 400,
                                height: 80,
                                backgroundColor: COLORS.primary,
                                marginTop: 20,
                            }}

                            onPress={() => {

                                navigation.navigate("Shipment")
                            }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: "700",
                                alignSelf: "center",
                                justifyContent: "center",
                                padding: 20
                            }}>
                                CHECKOUT  • $ {totalPrice}
                            </Text>
                        </TouchableOpacity>

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
                            You have nothing in cart!
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
    }

    const Shipment = ({ route }) => {
        const [deliverymeth, setdeliverymeth] = useState(false)
        const [myaddress, setmyaddress] = useState()
        const [getaddress, setaddress] = useState(loggeduser.address)
        return (
            <View style={[styles.container, { backgroundColor: COLORS.black }]}>
                <Text style={{ marginBottom: 60, fontSize: 20, fontWeight: "400", letterSpacing: 3, color: COLORS.white, alignSelf: "flex-start", margin: 30 }}>
                    Checkout
                </Text>
                <TouchableOpacity
                    style={{ height: 160, width: "90%", borderBottomWidth: 1, borderColor: COLORS.white, marginTop: 20 }}
                    onPress={() => { setdeliverymeth(true) }}>
                    <Text style={{ fontSize: 24, fontWeight: "400", letterSpacing: 1, color: COLORS.white }}>
                        Delivery method
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 14, color: COLORS.white, marginTop: 20 }}>
                            Choose a delivery method
                        </Text>
                        {deliverymeth ?
                            <AntDesign name="check" size={25} color={COLORS.primary} style={{ margin: 10 }} />
                            :

                            <AntDesign name="arrowright" size={25} color={COLORS.white} style={{ margin: 10 }} />
                        }
                    </View>
                    <Text style={{ fontSize: 17, fontWeight: "400", letterSpacing: 1, color: COLORS.white }}>
                        Standard Shipping - Free
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 14, color: COLORS.primary, marginTop: 20 }}>
                            (Shipping 4-6 working days)
                        </Text>

                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        height: 160, width: "90%", borderBottomWidth: 1,
                        borderColor: COLORS.white, marginTop: 20
                    }}
                    onPress={() => { setmyaddress(getaddress) }}>
                    <Text style={{ fontSize: 24, fontWeight: "400", letterSpacing: 1, color: COLORS.white }}>
                        Shipping address
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 14, color: COLORS.white, marginTop: 20 }}>
                            Add a Billing address
                        </Text>

                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                        <Text style={{ fontSize: 17, marginRight: 20, fontWeight: "400", letterSpacing: 1, color: COLORS.primary }}>
                            {getaddress}
                        </Text>

                        {myaddress ?
                            <AntDesign name="check" size={25} color={COLORS.primary} style={{ margin: 10 }} />
                            :

                            <AntDesign name="arrowright" size={25} color={COLORS.white} style={{ margin: 10 }} />
                        }
                    </View>
                </TouchableOpacity>
                {(deliverymeth && myaddress) ?
                    <TouchableOpacity
                        style={{
                            width: 400,
                            height: 80,
                            backgroundColor: COLORS.primary,
                            marginTop: 160,
                        }}

                        onPress={() => {

                            navigation.navigate("Order")
                        }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "700",
                            alignSelf: "center",
                            justifyContent: "center",
                            padding: 20
                        }}>
                            CHECKOUT  • ${cartData.reduce(
                                (total, item) => total + item.price,
                                0,
                            )}
                        </Text>
                    </TouchableOpacity> :
                    <TouchableOpacity
                        style={{
                            width: 400,
                            height: 80,
                            backgroundColor: COLORS.white,
                            marginTop: 160,
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
                            CHECKOUT  • ${cartData.reduce(
                                (total, item) => total + item.price,
                                0,
                            )}
                        </Text>
                    </TouchableOpacity>
                }

            </View>
        )
    }

    const Order = () => {
        const sendreq = () => {
            let ID = uuid.v4().toString();

            var reqOptions = {
                method: 'PUT',

                body: JSON.stringify({
                    ID: ID,
                    userID: 12342,
                    shippingInfo: "jhffjv",
                    totalPrice: totalPrice,
                    orderItems: cartData,

                }),
            };

            fetch(
                `https://store-5d6ee-default-rtdb.firebaseio.com/Order/${ID}.json`,
                reqOptions
            )
                .then((res) => console.log(res))
                .then((result) => {
                    del()
        
                .catch((error) =>
                    console.log(error)
                );
                    ToastAndroid.showWithGravityAndOffset(
                        "Ordered Successfully!",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    )

                    navigation.navigate("Home")
                }
                )
                .catch((error) => {
                    console.log(error)
                }
                );
        }
        const del = () => {
            setcondition(true)
            
            for (var i in cartData) {
                console.log(cartData.ID)

                var reqOptions = {
                    method: 'DELETE',

                    body: JSON.stringify({
                        ID: cartData.ID,

                    }),


                };
            

            fetch(
                `https://store-5d6ee-default-rtdb.firebaseio.com/Cart/${ID}.json`,
                reqOptions
            )
                .then((res) => console.log(res))
                .then((result) => {
                    setcondition(false)
                    

                }
            
                )
            }
            
        }


        return (
            <View style={[styles.container, { backgroundColor: COLORS.black }]}>
                <View style={styles.header}>
                    <Icons name="cart" size={28} onPress={navigation.goBack} color={COLORS.primary}
                    />
                    <Text style={{
                        fontSize: 25, fontWeight: 'bold', color: COLORS.primary
                    }}>Your Order</Text>
                </View>

                {cartData?.length > 0 ? (
                    <View >
                        <View style={{ height: "80%" }}>

                            <FlatList

                                data={cartData}
                                extraData={cartData}
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

                                                    <Entypo name="circle-with-cross" size={25} style={{ padding: 5 }} color={COLORS.white} />

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
                        <TouchableOpacity
                            style={{
                                width: 400,
                                height: 80,
                                backgroundColor: COLORS.primary,
                                marginTop: 20,
                            }}

                            onPress={() => {

                                sendreq()
                            }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: "700",
                                alignSelf: "center",
                                justifyContent: "center",
                                padding: 20
                            }}>
                                PLACE ORDER • ${cartData.reduce(
                                    (total, item) => total + item.price,
                                    0,
                                )}
                            </Text>
                        </TouchableOpacity>

                    </View>
                ) : (
                    <View><Text>hjb</Text></View>
                )}






            </View>
        )
    }

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="UserCart" component={UserCart} />
            <Stack.Screen name="Shipment" component={Shipment} />

            <Stack.Screen name="Order" component={Order} />




        </Stack.Navigator>
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