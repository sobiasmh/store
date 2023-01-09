import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity,ToastAndroid, Image, TextInput, ScrollView,ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import COLORS from '../const/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';

export default ({ navigation, route }) => {
    const Stack = createNativeStackNavigator();
    const [userdata, setuserdata] = useState([])
    const [loggeduser, setloggeduser] = useState()
    const [token, settoken] = useState()
    const [getcondition, setcondition] = useState(true)

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
    useEffect(() => {
        _retrieveData()
        getuser();
        
    }, [getcondition]);
    if (getcondition) {
        return (
            <View style={[styles.container]}>
                <ActivityIndicator size="large" />

                <Text>Waiting for response</Text>
            </View>
        );
    }

    const SettingsScreen = () => {
        
        return (
            <View style={styles.container}>
                <Image
                    source={require('../imgs/pic.png')}
                    style={{ height: 150, width: 150, borderRadius: 50 }} />
                <Text style={{ fontWeight: "400", fontSize: 16, marginBottom: 130, marginTop:20 }}>{loggeduser? loggeduser.firstname: "User"}</Text>
                <TouchableOpacity
                    style={{ width: "100%", height: 70, borderBottomWidth: 1 }}
                    onPress={() => {navigation.navigate("PersonalInfo") }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: "400", fontSize: 17, margin: 10 }}>
                            Personal Information
                        </Text>
                        <AntDesign name="arrowright" style={{ margin: 10 }} size={30} color={COLORS.black} onPress={() => {
                            navigation.navigate('ConfirmPasswordScreen', {
                            })
                        }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ width: "100%", height: 70, borderBottomWidth: 1 }}
                    onPress={() => { navigation.navigate('Cart', {
                    }) }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: "400", fontSize: 17, margin: 10 }}>
                            Order 
                        </Text>
                        <AntDesign name="arrowright" style={{ margin: 10 }} size={30} color={COLORS.black} onPress={() => {
                           
                        }} />
                    </View>
                </TouchableOpacity>


            </View>
        )
    }

    const PersonalInfo = () => {
        const [firstname, setfirstname] = useState(loggeduser.firstname)
        const [lastname, setlastname] = useState(loggeduser.lastname)
        const [Phonenumber, setPhonenumber] = useState(loggeduser.phone)
        const [address, setaddress] = useState(loggeduser.address)
        const [city, setCity] = useState(loggeduser.city)
        const [dob, setdob] = useState(loggeduser.dob)

        const updateInfo = (ID) =>{

            var reqOptions = {
                method: 'PUT',
        
                body: JSON.stringify({
                  ID : loggeduser.ID,
                  gender: loggeduser.gender,
                  password : loggeduser.password,
                  email: loggeduser.email,
                  firstname: firstname,
                  lastname: lastname,
                  phone: Phonenumber,
                  address: address,
                  dob : dob,
                  city: city,
                }),
              };
        
              fetch(
                `https://store-5d6ee-default-rtdb.firebaseio.com/Users/${ID}.json`,
                reqOptions
              )
                .then((res) => console.log(res))
                .then((result) => {
                    ToastAndroid.showWithGravityAndOffset(
                        "Updated Successfully!",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                      )
                    navigation.navigate("SettingsScreen")
                })
                .catch((error) => console.log('error', error));
        } 
        return (
            <ScrollView>
            <View style={styles.container}>
                <Image
                    source={require('../imgs/pic.png')}
                    style={{ height: 150, width: 150, borderRadius: 50 }} />
                <Text style={{ fontWeight: "400", fontSize: 16, marginBottom: 10, marginTop:20 }}>{loggeduser? loggeduser.firstname: "User"}</Text>
                <TouchableOpacity style={{height:40, width:100, backgroundColor:COLORS.primary, borderRadius:5}}
                onPress={()=>{updateInfo(loggeduser.ID)}}>
                    <Text style={{color:COLORS.white, fontSize:15, alignSelf:"center", margin:10}}>
                        Update

                    </Text>
                </TouchableOpacity>
                <View style={{ marginTop: 10, marginBottom: 30 }}>
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={[styles.inputStyle, { backgroundColor: '#EEEEEE' }]}
                                    onChangeText={(firstname) =>
                                        setfirstname(firstname)
                                    }
                                    value={firstname}
                                    placeholder="First Name"
                                    placeholderTextColor="#ACA9A9"
                                    underlineColorAndroid="#f000"
                                />
                            </View>
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={[styles.inputStyle, { backgroundColor: '#EEEEEE' }]}
                                    onChangeText={(lastname) =>
                                        setlastname(lastname)
                                    }
                                    value={lastname}

                                    placeholder="Last Name"
                                    placeholderTextColor="#ACA9A9"
                                    underlineColorAndroid="#f000"
                                />
                            </View>
                            <View style={styles.SectionStyle}>
                                
                            <TextInput
                                    style={[styles.inputStyle, { backgroundColor: '#EEEEEE' }]}
                                    onChangeText={(dob) =>
                                        setdob(dob)
                                    }
                                    value={dob}

                                    placeholder="Birthday"
                                    placeholderTextColor="#ACA9A9"
                                    underlineColorAndroid="#f000"
                                />

                            </View>
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={[styles.inputStyle, { backgroundColor: '#EEEEEE' }]}
                                    onChangeText={(Phonenumber) =>
                                        setPhonenumber(Phonenumber)
                                    }
                                    value={Phonenumber}

                                    placeholder="Phone Number" //12345
                                    placeholderTextColor='#ACA9A9'
                                    keyboardType="number-pad"
                                    underlineColorAndroid="#f000"
                                    returnKeyType="next"
                                />
                            </View>
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={[styles.inputStyle, { backgroundColor: '#EEEEEE' }]}
                                    onChangeText={(address) =>
                                        setaddress(address)
                                    }
                                    value={address}

                                    placeholder="Address"
                                    placeholderTextColor="#ACA9A9"
                                    underlineColorAndroid="#f000"
                                />
                            </View>
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={[styles.inputStyle, { backgroundColor: '#EEEEEE' }]}
                                    onChangeText={(city) =>
                                        setCity(city)
                                    }
                                    value={city}

                                    placeholder="City"
                                    placeholderTextColor="#ACA9A9"
                                    underlineColorAndroid="#f000"
                                />
                            </View>
                        </View>

            </View>
            </ScrollView>
        )
    }

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="SettingsScreen" component={SettingsScreen}  />
            <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
            <Stack.Screen name="Orders" component={PersonalInfo} />



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
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "#4d4343",
        borderRadius: 10,


    },
    SectionStyle: {
        flexDirection: 'row',
        height: 47,
        width: '80%',
        marginTop: 14,
        marginBottom: 5,

    },

});