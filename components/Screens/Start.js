import React, { useState, useEffect } from 'react';
import { StyleSheet, ToastAndroid, Text, View, ImageBackground, TouchableOpacity, Image, Button, Pressable, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Entypo from 'react-native-vector-icons/Entypo';
import COLORS from '../const/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import uuid from 'react-native-uuid';
import { auth } from '../const/firebase';
import AsyncStorage from '@react-native-community/async-storage';

export default ({ navigation }) => {


    const Stack = createNativeStackNavigator();

    const StartScreen = () => {
        return (
            <View style={styles.container}>
                <View>
                    <ImageBackground source={require('../imgs/store.png')} resizeMode="cover" style={styles.backimg}>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 512 }}>
                                <Entypo
                                    name="home"
                                    style={{ marginLeft: 75, marginRight: 10 }}
                                    size={35}
                                    color={COLORS.white}
                                />
                                <Text style={styles.text}>WOODEN HOME</Text>
                            </View>
                            <View>
                                <Text style={styles.text2}>Designed For Your Comfort</Text>
                            </View>
                            <View>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        navigation.navigate('DontMissOut', {
                                        });
                                    }}>
                                    <Text style={styles.text3}>
                                        Let’s start
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ImageBackground>

                </View>

            </View>

        )
    }
    const DontMissOut = () => {
        return (
            <View style={[styles.container, { backgroundColor: COLORS.black }]}>
                <TouchableOpacity style={{ alignSelf: "flex-end", marginRight: 40, marginTop: 50 }}>
                    <Text style={{
                        color: COLORS.primary,
                        fontSize: 22,
                        fontWeight: "400",
                        textDecorationLine: "underline"
                    }}>
                        Skip
                    </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 60 }}>
                    <Entypo
                        name="home"
                        style={{ marginLeft: 75, marginRight: 10 }}
                        size={35}
                        color={COLORS.white}
                    />
                    <Text style={styles.text}>WOODEN HOME</Text>
                </View>
                <Image
                    source={require('../imgs/users.webp')}
                    style={{ height: 250, width: 340, alignSelf: 'center', margin: 40, borderRadius: 15 }} />
                <Text style={styles.text2}>Dont’ miss out</Text>
                <Text style={styles.text4}>Help us deliver your products to the right place for you </Text>
                <TouchableOpacity
                    style={{
                        width: "100%",
                        height: 106,
                        backgroundColor: COLORS.primary,
                        marginTop: 140
                    }}

                    onPress={() => {
                        navigation.navigate('Camera', {
                        });
                    }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: "700",
                        alignSelf: "center",
                        justifyContent: "center",
                        padding: 20
                    }}>
                        ACCEPT
                    </Text>
                </TouchableOpacity>


            </View>
        )
    }

    const Camera = () => {
        return (
            <View style={[styles.container, { backgroundColor: COLORS.black }]}>
                <TouchableOpacity style={{ alignSelf: "flex-end", marginRight: 40, marginTop: 50 }}>
                    <Text style={{
                        color: COLORS.primary,
                        fontSize: 22,
                        fontWeight: "400",
                        textDecorationLine: "underline"
                    }}>
                        Skip
                    </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 60 }}>
                    <Entypo
                        name="home"
                        style={{ marginLeft: 75, marginRight: 10 }}
                        size={35}
                        color={COLORS.white}
                    />
                    <Text style={styles.text}>WOODEN HOME</Text>
                </View>
                <Image
                    source={require('../imgs/cme.webp')}
                    style={{ height: 250, width: 340, alignSelf: 'center', margin: 40, borderRadius: 15 }} />
                <Text style={[styles.text4, { color: COLORS.white }]}>Meko needs permission to access your Camera, Photos.</Text>
                <TouchableOpacity
                    style={{
                        width: "100%",
                        height: 106,
                        backgroundColor: COLORS.primary,
                        marginTop: 180,
                    }}

                    onPress={() => {
                        navigation.navigate('Welcome', {
                        });
                    }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: "700",
                        alignSelf: "center",
                        justifyContent: "center",
                        padding: 20
                    }}>
                        ACCEPT
                    </Text>
                </TouchableOpacity>


            </View>
        )
    }

    const Welcome = () => {
        return (
            <View style={styles.container}>
                <View>
                    <ImageBackground source={require('../imgs/store.png')} resizeMode="cover" style={styles.backimg}>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 230, marginBottom: 170 }}>
                                <Entypo
                                    name="home"
                                    style={{ marginLeft: 75, marginRight: 10 }}
                                    size={35}
                                    color={COLORS.white}
                                />
                                <Text style={styles.text}>WOODEN HOME</Text>
                            </View>

                            <View>
                                <Pressable
                                    style={styles.press}
                                    onPress={() => {
                                        navigation.navigate('Login')

                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            fontWeight: "400"
                                        }}>
                                        Already have an account? Login
                                    </Text>
                                </Pressable>

                                <Pressable
                                    style={styles.press}
                                    onPress={() => {

                                    }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Image
                                            source={require('../imgs/google.png')}
                                            style={{ height: 25, width: 25, alignSelf: 'center', margin: 6 }} />
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                margin: 9
                                            }}>
                                            Continue with Google
                                        </Text>
                                    </View>

                                </Pressable>
                                <Pressable
                                    style={styles.press}
                                    onPress={() => {
                                        navigation.navigate('EmailScreen', {
                                        });
                                    }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Entypo
                                            name="mail"
                                            style={{ marginLeft: 5 }}
                                            size={35}
                                            color={COLORS.white}
                                        />
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                margin: 9
                                            }}>
                                            Continue with Email
                                        </Text>
                                    </View>

                                </Pressable>

                            </View>

                        </View>
                    </ImageBackground>

                </View>

            </View>
        )
    }

    const EmailScreen = () => {
        const [email, setemail] = useState()
        return (
            <View style={[styles.container, { backgroundColor: COLORS.black }]}>
                <View
                    style={[
                        {
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            backgroundColor: COLORS.black,
                            height: 80,
                            padding: 6,
                            paddingVertical: 10,
                            justifyContent: "space-between",
                            alignItems: "center",
                        },
                        styles.shadow,
                    ]}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <AntDesign name="arrowleft" size={30} color={COLORS.primary} onPress={() => {
                            navigation.navigate('Welcome', {
                            })
                        }} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 100, marginBottom: 120 }}>
                    <Pressable
                    ></Pressable><Entypo
                        name="home"
                        style={{ marginLeft: 75, marginRight: 10 }}
                        size={35}
                        color={COLORS.white}

                    />
                    <Text style={styles.text}>WOODEN HOME</Text>
                </View>

                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: "400",
                        margin: 9,
                        color: COLORS.white,
                        alignSelf: "flex-start",
                        marginLeft: 50
                    }}>
                    Enter Email Address
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "400",
                        margin: 9,
                        color: COLORS.white,
                        alignSelf: "flex-start",
                        marginLeft: 50
                    }}>
                    Provide perosnal email
                </Text>
                <View style={{ marginTop: 10, flex: 1 }}>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            value={email}
                            onChangeText={(email) => setemail(email)}
                            placeholder="Email"
                            placeholderTextColor="#ACA9A9"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            clearButtonMode='always'
                            blurOnSubmit={false}
                        />
                    </View>
                    <Pressable
                        style={[styles.press, { marginTop: 100 }]}
                        onPress={() => {
                            navigation.navigate('PasswordScreen', { email:email
                            })
                        }}>
                        <View style={{ flexDirection: "row" }}>

                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: "400",
                                    margin: 9,
                                    marginRight: 80,
                                    alignSelf: "center"

                                }}>
                                CONTINUE
                            </Text>
                            <AntDesign name="arrowright" size={25} style={{ margin: 9 }} color={COLORS.black} />

                        </View>

                    </Pressable>
                </View>
            </View>

        )
    }

    const PasswordScreen = ({route}) => {
        const {email} = route.params
        const [password, setpassword] = useState()
        
        return (
            <View style={[styles.container, { backgroundColor: COLORS.black }]}>
                <View
                    style={[
                        {
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            backgroundColor: COLORS.black,
                            height: 80,
                            padding: 6,
                            paddingVertical: 10,
                            justifyContent: "space-between",
                            alignItems: "center",
                        },
                        styles.shadow,
                    ]}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <AntDesign name="arrowleft" size={30} color={COLORS.primary} onPress={() => {
                            navigation.navigate('EmailScreen', {
                            })
                        }} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 100, marginBottom: 120 }}>
                    <Pressable
                    ></Pressable><Entypo
                        name="home"
                        style={{ marginLeft: 75, marginRight: 10 }}
                        size={35}
                        color={COLORS.white}

                    />
                    <Text style={styles.text}>WOODEN HOME</Text>
                </View>

                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: "400",
                        margin: 9,
                        color: COLORS.white,
                        alignSelf: "flex-start",
                        marginLeft: 50
                    }}>
                    Enter Password
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "400",
                        margin: 9,
                        color: COLORS.white,
                        alignSelf: "flex-start",
                        marginLeft: 50
                    }}>
                    Use 8 or more characters
                </Text>
                <View style={{ marginTop: 10, flex: 1 }}>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(password) => setpassword(password)}
                            value={password}
                            placeholder="Password" //12345
                            placeholderTextColor="#ACA9A9"
                            keyboardType="default"
                            blurOnSubmit={false}
                            secureTextEntry={true}
                            enablesReturnKeyAutomatically
                            underlineColorAndroid="#f000"

                        />
                    </View>
                    <Pressable
                        style={[styles.press, { marginTop: 100 }]}
                        onPress={() => {
                            navigation.navigate("ProfileMaking", {email:email, password:password})

                        }}>
                        <View style={{ flexDirection: "row" }}>

                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: "400",
                                    margin: 9,
                                    marginRight: 80,
                                    alignSelf: "center"

                                }}>
                                CONTINUE
                            </Text>
                            <AntDesign name="arrowright" size={25} style={{ margin: 9 }} color={COLORS.black} />

                        </View>

                    </Pressable>
                </View>
            </View>

        )
    }
    const ConfirmPasswordScreen = () => {
        const [confirmpassword, setconfirmpassword] = useState()
        return (
            <View style={[styles.container, { backgroundColor: COLORS.black }]}>
                <View
                    style={[
                        {
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            backgroundColor: COLORS.black,
                            height: 80,
                            padding: 6,
                            paddingVertical: 10,
                            justifyContent: "space-between",
                            alignItems: "center",
                        },
                        styles.shadow,
                    ]}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <AntDesign name="arrowleft" size={30} color={COLORS.primary} onPress={() => {
                            navigation.navigate('PasswordScreen', {
                            })
                        }} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 100, marginBottom: 120 }}>
                    <Pressable
                    ></Pressable><Entypo
                        name="home"
                        style={{ marginLeft: 75, marginRight: 10 }}
                        size={35}
                        color={COLORS.white}

                    />
                    <Text style={styles.text}>WOODEN HOME</Text>
                </View>

                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: "400",
                        margin: 9,
                        color: COLORS.white,
                        alignSelf: "flex-start",
                        marginLeft: 50
                    }}>
                    Confirm Password
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "400",
                        margin: 9,
                        color: COLORS.white,
                        alignSelf: "flex-start",
                        marginLeft: 50
                    }}>
                    Please confirm you Password
                </Text>
                <View style={{ marginTop: 10, flex: 1 }}>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(confirmpassword) => setconfirmpassword(confirmpassword)}
                            value={confirmpassword}
                            placeholder="Password" //12345
                            placeholderTextColor="#ACA9A9"
                            keyboardType="default"
                            blurOnSubmit={false}
                            secureTextEntry={true}
                            enablesReturnKeyAutomatically
                            underlineColorAndroid="#f000"

                        />
                    </View>
                    <Pressable
                        style={[styles.press, { marginTop: 100 }]}
                        onPress={() => {
                            navigation.navigate("ProfileMaking")
                        }}>
                        <View style={{ flexDirection: "row" }}>

                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: "400",
                                    margin: 9,
                                    marginRight: 80,
                                    alignSelf: "center"

                                }}>
                                CONTINUE
                            </Text>
                            <AntDesign name="arrowright" size={25} style={{ margin: 9 }} color={COLORS.black} />

                        </View>

                    </Pressable>
                </View>
            </View>

        )
    }

    const ProfileMaking = ({route}) => {
        const {email, password} = route.params
        const [firstname, setfirstname] = useState()
        const [lastname, setlastname] = useState()
        const [Phonenumber, setPhonenumber] = useState()
        const [address, setaddress] = useState()
        const [city, setCity] = useState()
        const [datePicker, setDatePicker] = useState(false);
        const [gender, setGender] = useState()
        const [date, setDate] = useState(new Date());

       

        const onDateSelected = (event, value) => {
            setDate(value);
            setDatePicker(false);
        };

        const sendreq = () =>{
            let ID = uuid.v4().toString();

            var reqOptions = {
                method: 'PUT',
        
                body: JSON.stringify({
                  ID: ID,
                  email: email,
                  password: password,
                  firstname: firstname,
                  lastname: lastname,
                  phone: Phonenumber,
                  address: address,
                  dob : date.toDateString(),
                  city: city,
                  gender: gender
                }),
              };
        
              fetch(
                `https://store-5d6ee-default-rtdb.firebaseio.com/Users/${ID}.json`,
                reqOptions
              )
                .then((res) => console.log(res))
                .then((result) => {
                    ToastAndroid.showWithGravityAndOffset(
                        "Registered Successfully!",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                      )
                    navigation.navigate("Welcome")
                })
                .catch((error) => console.log('error', error));
        }

        
            return (
                <ScrollView>
                    <View style={[styles.container, { backgroundColor: COLORS.white }]}>
                        <View
                            style={[
                                {
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "100%",
                                    backgroundColor: COLORS.primary,
                                    height: 80,
                                    padding: 6,
                                    paddingVertical: 10,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                },
                                styles.shadow,
                            ]}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <AntDesign name="arrowleft" size={30} color={COLORS.black} onPress={() => {
                                    navigation.navigate('ConfirmPasswordScreen', {
                                    })
                                }} />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 40, marginBottom: 50 }}>
                            <Entypo
                                name="home"
                                style={{ marginLeft: 75, marginRight: 10 }}
                                size={35}
                                color={COLORS.black}

                            />
                            <Text style={[styles.text, { color: COLORS.black }]}>WOODEN HOME</Text>
                        </View>

                        <Image
                            source={require('../imgs/pic.png')}
                            style={{ height: 150, width: 150, borderRadius: 50 }} />
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 25 }}>
                            <Pressable
                                style={styles.press2}
                                onPress={() => {
                                    setGender("Male")

                                }}>
                                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                    <Ionicons name="male-sharp" size={30} color={COLORS.black} />
                                    <Text style={{ fontSize: 17, fontWeight: "700", margin: 5 }}>
                                        Male
                                    </Text>
                                </View>
                            </Pressable>

                            <Pressable
                                style={[styles.press2, { borderWidth: 0, backgroundColor: COLORS.primary }]}
                                onPress={() => {

                                    setGender("Female")
                                }}>
                                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                    <Ionicons name="male-sharp" size={30} color={COLORS.black} />
                                    <Text style={{ fontSize: 17, fontWeight: "700", margin: 5 }}>
                                        Female
                                    </Text>
                                </View>
                            </Pressable>

                        </View>
                        <View style={{ marginTop: 30, marginBottom: 30 }}>
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={[styles.inputStyle, { backgroundColor: '#EEEEEE' }]}
                                    onChangeText={(firstname) =>
                                        setfirstname(firstname)
                                    }
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
                                    placeholder="Last Name"
                                    placeholderTextColor="#ACA9A9"
                                    underlineColorAndroid="#f000"
                                />
                            </View>
                            <View style={styles.SectionStyle}>
                                
                                <TextInput
                                    style={[styles.inputStyle, {backgroundColor: '#EEEEEE', borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
                                    onChangeText={(date) =>
                                        setDate(date)
                                    }
                                    value={date.toDateString()}
                                    placeholder="Choose Your Birthday" //12345
                                    placeholderTextColor="#ACA9A9"
                                    keyboardType="default"
                                    underlineColorAndroid="#f000"

                                />
                                <Pressable onPress={()=>{setDatePicker(true)}} style={{
                                    backgroundColor: '#EEEEEE',
                                    borderTopRightRadius: 10,
                                    borderBottomRightRadius: 10,
                                    padding: 8,
                                }}>
                                    <Entypo name="calendar" size={22} color={COLORS.primary} />
                                </Pressable>
                                {datePicker && (
                                     <DateTimePicker
                                     value={date}
                                     mode={'date'}
                                     display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                     is24Hour={true}
                                     onChange={onDateSelected}
                                     style={styles.datePicker}
                                 />
                                )}

                            </View>
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={[styles.inputStyle, { backgroundColor: '#EEEEEE' }]}
                                    onChangeText={(Phonenumber) =>
                                        setPhonenumber(Phonenumber)
                                    }
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
                                    placeholder="City"
                                    placeholderTextColor="#ACA9A9"
                                    underlineColorAndroid="#f000"
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                    style={{
                        width: "100%",
                        height: 106,
                        backgroundColor: COLORS.black,
                        marginTop: 40,
                    }}

                    onPress={() => {
                        sendreq()
                        // navigation.navigate('Welcome', {
                        // });
                    }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: "700",
                        alignSelf: "center",
                        justifyContent: "center",
                        padding: 20,
                        color:COLORS.white
                    }}>
                        DONE
                    </Text>
                </TouchableOpacity>


                    </View>
                </ScrollView>

            )
        
        
    }
    const Login = () => {
        const [useremail, setuseremail] = useState()
        

        return (
            <View style={[styles.container, { backgroundColor: COLORS.black }]}>
                <View
                    style={[
                        {
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            backgroundColor: COLORS.black,
                            height: 80,
                            padding: 6,
                            paddingVertical: 10,
                            justifyContent: "space-between",
                            alignItems: "center",
                        },
                        styles.shadow,
                    ]}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <AntDesign name="arrowleft" size={30} color={COLORS.primary} onPress={() => {
                            navigation.navigate('Welcome', {
                            })
                        }} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 100, marginBottom: 120 }}>
                    <Pressable
                    ></Pressable><Entypo
                        name="home"
                        style={{ marginLeft: 75, marginRight: 10 }}
                        size={35}
                        color={COLORS.white}

                    />
                    <Text style={styles.text}>WOODEN HOME</Text>
                </View>

                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: "400",
                        margin: 9,
                        color: COLORS.white,
                        alignSelf: "flex-start",
                        marginLeft: 50
                    }}>
                    Enter Email Address
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "400",
                        margin: 9,
                        color: COLORS.white,
                        alignSelf: "flex-start",
                        marginLeft: 50
                    }}>
                    Please input your email  to continue
                </Text>
                <View style={{ marginTop: 10, flex: 1 }}>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            value={useremail}
                            onChangeText={(useremail) => setuseremail(useremail)}
                            placeholder="Enter Email"
                            placeholderTextColor="#ACA9A9"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            clearButtonMode='always'
                            blurOnSubmit={false}
                        />
                    </View>
                    <Pressable
                        style={[styles.press, { marginTop: 100 }]}
                        onPress={() => {
                            navigation.navigate('PasswordLogin', { useremail:useremail
                            })
                        }}>
                        <View style={{ flexDirection: "row" }}>

                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: "400",
                                    margin: 9,
                                    marginRight: 80,
                                    alignSelf: "center"

                                }}>
                                CONTINUE
                            </Text>
                            <AntDesign name="arrowright" size={25} style={{ margin: 9 }} color={COLORS.black} />

                        </View>

                    </Pressable>
                </View>
            </View>

        )
    }
    const PasswordLogin = ({route}) => {
        const {useremail} = route.params
        const [userpassword, setuserpassword] = useState()
        const [userdata, setuserdata] = useState([])
        const [token, settoken] = useState()
        
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

                })
                .catch((err) => {
                    console.error(err);
                });

                
        };

        const login =  () =>{
            userdata?.map((user,i)=>{
            if(user.email === useremail && user.password === userpassword){
               
                  store()
                
                ToastAndroid.showWithGravityAndOffset(
                    "Logged in Successfully!",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                  )
               navigation.navigate("Home")
            }
            
        })}
        const store = async  ()=>{
            try {
                await AsyncStorage.setItem(
                    '@userID',
                    useremail,
                );
                console.log("done")
              } catch (error) {
                console.log(error)
              }
        }
       
        useEffect(() => {
            getuser();
            
        }, []);

        return (
            <View style={[styles.container, { backgroundColor: COLORS.black }]}>
                <View
                    style={[
                        {
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            backgroundColor: COLORS.black,
                            height: 80,
                            padding: 6,
                            paddingVertical: 10,
                            justifyContent: "space-between",
                            alignItems: "center",
                        },
                        styles.shadow,
                    ]}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <AntDesign name="arrowleft" size={30} color={COLORS.primary} onPress={() => {
                            navigation.navigate('EmailScreen', {
                            })
                        }} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 100, marginBottom: 120 }}>
                   <Entypo
                        name="home"
                        style={{ marginLeft: 75, marginRight: 10 }}
                        size={35}
                        color={COLORS.white}

                    />
                    <Text style={styles.text}>WOODEN HOME</Text>
                </View>

                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: "400",
                        margin: 9,
                        color: COLORS.white,
                        alignSelf: "flex-start",
                        marginLeft: 50
                    }}>
                    Enter Password
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "400",
                        margin: 9,
                        color: COLORS.white,
                        alignSelf: "flex-start",
                        marginLeft: 50
                    }}>
                    To continue shopping, first verify it’s you
                </Text>
                <View style={{ marginTop: 10, flex: 1 }}>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(userpassword) => setuserpassword(userpassword)}
                            value={userpassword}
                            placeholder="Enter Password" //12345
                            placeholderTextColor="#ACA9A9"
                            keyboardType="default"
                            blurOnSubmit={false}
                            secureTextEntry={true}
                            enablesReturnKeyAutomatically
                            underlineColorAndroid="#f000"

                        />
                    </View>
                    <Pressable
                        style={[styles.press, { marginTop: 100 }]}
                        onPress={() => {
                           login()
                           //navigation.navigate("Home")
                        }}>
                        <View style={{ flexDirection: "row" }}>

                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: "400",
                                    margin: 9,
                                    marginRight: 80,
                                    alignSelf: "center"

                                }}>
                                CONTINUE
                            </Text>
                            <AntDesign name="arrowright" size={25} style={{ margin: 9 }} color={COLORS.black} />

                        </View>

                    </Pressable>
                </View>
            </View>

        )
    }

    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="DontMissOut" component={DontMissOut} />
            <Stack.Screen name="Camera" component={Camera} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="EmailScreen" component={EmailScreen} />
            <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
            <Stack.Screen name="ConfirmPasswordScreen" component={ConfirmPasswordScreen} />
            <Stack.Screen name="ProfileMaking" component={ProfileMaking} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="PasswordLogin" component={PasswordLogin} />


        </Stack.Navigator>





    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backimg: {
        height: "100%",
        width: 420,


    },
    text: {
        color: "white",
        fontSize: 32,
        fontWeight: "400",
        textAlign: "center",
        marginRight: 75
    },
    text2: {
        color: "white",
        fontSize: 17,
        textAlign: "center",
        fontWeight: "400",
        marginTop: 20,

    },
    text3: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "400",

    },
    button: {
        backgroundColor: COLORS.primary,
        width: 200,
        height: 54,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        alignSelf: "center",
        activeOpacity: 0.8,

    },
    text4: {
        fontSize: 15,
        fontWeight: "300",
        fontStyle: "italic",
        color: COLORS.primary,
        textAlign: "center",
        marginRight: 50,
        marginLeft: 50,
        marginTop: 10

    },
    press: {
        backgroundColor: COLORS.primary,
        width: 276,
        height: 54,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        marginBottom: 20

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
    press2: {
        height: 35,
        width: 136,
        backgroundColor: "#DAD7CC",
        borderWidth: 1,
        margin: 10

    },
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
      },
});
