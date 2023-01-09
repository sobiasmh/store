import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image,ActivityIndicator } from 'react-native';
import COLORS from '../const/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default ({ navigation }) => {
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

    return (
        <View style={styles.container}>
            <Image
                    source={require('../imgs/pic.png')}
                    style={{ height: 150, width: 150, borderRadius: 50 }} />
                <Text style={{ fontWeight: "400", fontSize: 16, marginBottom: 70, marginTop:20 }}>{loggeduser? loggeduser.firstname: "User"}</Text>
                <TouchableOpacity
                    style={{ width: "100%", height: 70, borderBottomWidth: 1 }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: "400", fontSize: 17, margin: 10 }}>
                        Help & Customer service
                        </Text>
                        <AntDesign name="arrowright" style={{ margin: 10 }} size={30} color={COLORS.black} onPress={() => {
                            navigation.navigate('ConfirmPasswordScreen', {
                            })
                        }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ width: "100%", height: 70, borderBottomWidth: 1 }}
                    onPress={() => { }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: "400", fontSize: 17, margin: 10 }}>
                        Terms and Conditions 
                        </Text>
                        <AntDesign name="arrowright" style={{ margin: 10 }} size={30} color={COLORS.black} onPress={() => {
                            navigation.navigate('ConfirmPasswordScreen', {
                            })
                        }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ width: "100%", height: 70, borderBottomWidth: 1 }}
                    onPress={() => { }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: "400", fontSize: 17, margin: 10 }}>
                        Privacy policy
                        </Text>
                        <AntDesign name="arrowright" style={{ margin: 10 }} size={30} color={COLORS.black} onPress={() => {
                            navigation.navigate('ConfirmPasswordScreen', {
                            })
                        }} />
                    </View>
                </TouchableOpacity>
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

});