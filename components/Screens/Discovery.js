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
    const Stack = createNativeStackNavigator();


    const Search = () => {
        const [search, setsearch] = useState()
        const [usersearch, setusersearch] = useState([
            { 'searches': "Bed set" }
        ])


        return (
            <View style={[styles.container, { backgroundColor: COLORS.black }]}>
                <Text style={{
                    color: COLORS.white,
                    fontSize: 18,
                    fontWeight: "700",
                    letterSpacing: 3,
                    alignSelf: "flex-start",
                    marginLeft: 20,
                    margin: 20,
                }}>SEARCH </Text>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={[styles.inputStyle]}
                        onChangeText={(search) =>
                            setsearch(search)
                        }
                        placeholder="Search here...."
                        placeholderTextColor="#ACA9A9"
                        underlineColorAndroid="#f000"
                    />

                </View>
                <TouchableOpacity style={{
                    backgroundColor: COLORS.primary,
                    height: 30,
                    width: 90,
                    alignSelf: "flex-end",
                    margin: 10,
                    borderRadius: 5,
                    marginRight: 40
                }}
                    onPress={() => {
                        var obj = {};
                        obj['searches'] = search;


                        setusersearch([...usersearch, obj]);
                        navigation.navigate("ShopScreen",
                            { n: search })
                    }}>
                    <Text style={{ color: COLORS.black, fontSize: 14, fontWeight: "400", letterSpacing: 2, margin: 5, alignSelf: "center" }}>
                        Search
                    </Text>

                </TouchableOpacity>
                <Text style={{
                    color: COLORS.white,
                    fontSize: 18,
                    fontWeight: "700",
                    letterSpacing: 3,
                    alignSelf: "flex-start",
                    marginLeft: 20,
                    margin: 20,
                }}>Recent Searches </Text>

                <FlatList
                    data={usersearch}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ marginTop: 20, margin: 10 }}>
                                <Text style={{ fontSize: 17, fontWeight: "400", color: COLORS.primary }}>
                                    {item.searches}
                                </Text>


                            </View>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />

            </View>
        )
    }

    const DiscoverScreen1 = () => {
        const [list, setlist] = useState([
            { id: 1, name: "Exquisite design combined with functionalities", image: source = (require("../imgs/home2.png")) },
            { id: 2, name: "Exquisite design combined with functionalities", image: source = (require("../imgs/home3.png")) },
            { id: 3, name: "Exquisite design combined with functionalities", image: source = (require("../imgs/home4.png")) },
            { id: 3, name: "Exquisite design combined with functionalities", image: source = (require("../imgs/home5.png")) },

        ])
        return (
            <View style={[styles.container, { backgroundColor: COLORS.black }]}>
                <Text style={styles.text1}>
                    DISCOVER US
                </Text>
                <FlatList
                    data={list}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ width: 350, height: 240, }}>

                                <TouchableOpacity style={styles.coverButton} onPress={() => { navigation.navigate("ShopScreen") }}>
                                    <Image style={styles.coverPhoto} source={item.image} />
                                    <View style={{ position: 'absolute', top: 150, left: 10, right: 0, bottom: 0, justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                                        <Text
                                            style={{ fontSize: 15, fontWeight: "400", letterSpacing: 2, color: COLORS.white }}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />

            </View>
        )
    }
    const ShopScreen = ({ route }) => {
        const [products, setproduct] = useState([])

        const { n } = route.params != undefined ? route.params : {}
        const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
        const [selectedCategoryName, setSelectedCategoryName] = useState(0);
        const [gethigh, sethigh] = useState(false)
        const [getlow, setlow] = useState(false)

        const [categories, setcategories] = useState([
            { id: 1, name: 'All' },
            { id: 2, name: 'Sofas' },
            { id: 3, name: 'Dinning Tables' },
            { id: 4, name: 'Beds' },

        ]);
        const [getmodalvisible, setModalVisible] = React.useState(false);
        const [getcondition, setcondition] = React.useState(true);

        const getproduct = () => {
            fetch(
                "https://store-5d6ee-default-rtdb.firebaseio.com/Products.json",
                {
                    method: 'GET',
                }
            )
                .then((response) => response.json())
                .then((responsejson) => {
                    var res = responsejson.filter(e => {
                        return e != null
                    })
                    setproduct(res);

                    setcondition(false)


                })
                .catch((err) => {
                    console.error(err);
                });


        };





        useEffect(() => {
            getproduct();
        }, [products]);
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
                <Modal animationType="fade" visible={getmodalvisible}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{
                                color: COLORS.white,
                                fontSize: 18,
                                fontWeight: "700",
                                letterSpacing: 3,
                                alignSelf: "flex-start",
                                marginLeft: 20,
                                margin: 20,
                                marginBottom: 50
                            }}>SORT </Text>
                            <View style={{}}>
                                <TouchableOpacity
                                    style={{ width: 300, borderBottomWidth: 1, borderColor: COLORS.white }}
                                    onPress={() => {
                                        sethigh(true)
                                        setlow(false)
                                    }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ fontSize: 16, fontWeight: "400", margin: 10, textAlign: "center", letterSpacing: 2, color: COLORS.white }}>
                                            High to Low
                                        </Text>
                                        {gethigh && (<AntDesign name="check" size={25} color={COLORS.primary} style={{ margin: 10 }} onPress={() => {
                                        }} />)}
                                    </View>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: 300, borderBottomWidth: 1, borderColor: COLORS.white }}
                                    onPress={() => {
                                        sethigh(false)
                                        setlow(true)

                                    }}>
                                    <View style={{ flexDirection: "row" }}>

                                        <Text style={{ fontSize: 16, fontWeight: "400", margin: 10, textAlign: "center", letterSpacing: 2, color: COLORS.white }}>
                                            Low to High
                                        </Text>
                                        {getlow && (<AntDesign name="check" size={25} color={COLORS.primary} style={{ margin: 10 }} onPress={() => {
                                        }} />)}
                                    </View>

                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    backgroundColor: COLORS.primary,
                                    height: 30,
                                    width: 90,
                                    alignSelf: "flex-end",
                                    margin: 10,
                                    borderRadius: 5,
                                    marginRight: 40
                                }}
                                    onPress={() => {
                                        setModalVisible(false)
                                    }}>
                                    <Text style={{ color: COLORS.black, fontSize: 14, fontWeight: "400", letterSpacing: 2, margin: 5, alignSelf: "center" }}>
                                        Set
                                    </Text>

                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>
                <View style={styles.banner}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <AntDesign name="message1" size={25} color={COLORS.white} style={{ margin: 10 }} onPress={() => {
                            console.log(gethigh)
                            console.log(getlow)
                        }} />
                        <AntDesign name="search1" size={25} color={COLORS.white} style={{ margin: 10 }} onPress={() => {
                            navigation.navigate("Search")
                        }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 40, marginBottom: 20 }}>
                    <Entypo
                        name="home"
                        style={{ marginLeft: 75, marginRight: 10 }}
                        size={35}
                        color={COLORS.white}

                    />
                    <Text style={styles.text}>WOODEN HOME</Text>
                </View>
                <Text style={[styles.text1, { marginTop: 10 }]}>
                    OUR COLLECTIONS
                </Text>
                <View style={{ height: "10%" }}>
                    <FlatList
                        style={styles.categoriesListContainer}
                        data={categories}
                        horizontal={true}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    keyExtractor={(item, index) => index.toString()}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        setSelectedCategoryIndex(item.id)
                                        setSelectedCategoryName(item.name)
                                    }}>
                                    <View
                                        style={{
                                            backgroundColor:
                                                selectedCategoryIndex == item.id
                                                    ? COLORS.black
                                                    : COLORS.black,
                                            ...styles.categoryBtn,
                                        }}>

                                        <Text
                                            style={{
                                                fontSize: 15,
                                                fontWeight: '400',
                                                marginLeft: 10,
                                                letterSpacing: 2,
                                                alignSelf: 'center',
                                                textAlign: "center",

                                                color:
                                                    selectedCategoryIndex == item.id
                                                        ? COLORS.primary
                                                        : COLORS.white,
                                            }}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}

                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity style={{
                        borderRightWidth: 1, borderBottomWidth: 1, borderColor: COLORS.white, height: 40, width: 200
                    }}

                        onPress={() => {
                            setModalVisible(true)
                        }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                            <FontAwesome5 name="sort-amount-down" size={20} color={COLORS.primary}
                                style={{ margin: 2 }} />
                            <Text style={{ fontSize: 16, fontWeight: "400", color: COLORS.white, letterSpacing: 2, textAlign: "center" }}>
                                SORT
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        borderRightWidth: 1, borderBottomWidth: 1, borderColor: COLORS.white, height: 40, width: 200
                    }}
                        onPress={() => {
                            navigation.navigate("Filter")
                        }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                            <FontAwesome5 name="filter" size={20} color={COLORS.primary}
                                style={{ margin: 2 }} />
                            <Text style={{ fontSize: 16, fontWeight: "400", color: COLORS.white, letterSpacing: 2, textAlign: "center" }}>
                                FILTER
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={products ? products.filter((item) => item.name.match(n)) : products
                            && selectedCategoryIndex ? products.filter((item) => item.category.match(selectedCategoryName)) : products
                        && (getlow === true && products ? products.sort((i, j) => i.price > j.price) : products
                            || gethigh === true && products ? products.sort((i, j) => i.price < j.price) : products)

                        }
                        numColumns={2}
                        columnWrapperStyle={{ flexWrap: 'wrap' }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.row}>
                                    <View style={styles.carts}>
                                        <TouchableOpacity
                                            onPress={() => { navigation.navigate("ProductDetails", { product: item }) }}>
                                            <Image
                                                style={styles.productImg}
                                                source={{ uri: item.image }}
                                            />

                                            <Text style={styles.prdtext1}>{item.name}</Text>
                                            <Text style={styles.prdtext2}>$ {item.price}</Text>


                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        )
    }
    const ProductDetails = ({ route }) => {
        const { product } = route.params;
        const [getinfo, setinfo] = useState(true)
        const [getcompo, setcompo] = useState(false)
        const [errors, seterror] = useState(false)
        const [ resp, setresp] = useState(false)

        const sendreq = () =>{
            let ID = uuid.v4().toString();

            var reqOptions = {
                method: 'PUT',
        
                body: JSON.stringify({
                  ID: ID,
                  userID: 12342,
                  name: product.name,
                  image: product.image,
                  price: product.price,
                  category: product.category,
                 
                }),
              };
        
              fetch(
                `https://store-5d6ee-default-rtdb.firebaseio.com/Cart/${ID}.json`,
                reqOptions
              )
                .then((res) => console.log(res))
                .then((result) => {
                ToastAndroid.showWithGravityAndOffset(
                    "Added Successfully!",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                  )
                  

                setresp(true) }
               )
                .catch((error) => 
                seterror(true)
                );
                  if(errors===true){
                    ToastAndroid.showWithGravityAndOffset(
                        "Sorry, not Added!",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                      );

                  }
                 
        }

        return (
            <ScrollView>

                <View style={[styles.container, { backgroundColor: COLORS.black }]}>
                    <ImageBackground source={require("../imgs/sofa2.png")} blurRadius={1} resizeMode="cover" style={styles.backimg}>

                        <Text style={{
                            color: COLORS.white,
                            fontSize: 18,
                            fontWeight: "700",
                            letterSpacing: 3,
                            alignSelf: "flex-start",
                            marginLeft: 20,
                            margin: 20,
                        }}>DETAIL SCREEN</Text>
                        <Image
                            style={{ height: 300, width: 300, margin: 10, borderRadius: 5, alignSelf: "center" }}
                            source={{ uri: product.image }}
                        />
                        <Text style={{
                            color: COLORS.primary,
                            fontSize: 16,
                            fontWeight: "700",
                            letterSpacing: 3,
                            alignSelf: "center",
                            margin: 10,
                        }}>{product.name}</Text>
                        <Text style={{
                            color: COLORS.primary,
                            fontSize: 14,
                            fontWeight: "700",
                            letterSpacing: 3,
                            alignSelf: "center",
                            margin: 5,
                            marginBottom: 20
                        }}>{product.category}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <TouchableOpacity style={{
                                borderRightWidth: 1, borderBottomWidth: 1, borderColor: COLORS.white, height: 40, width: 200
                            }}
                                onPress={() => {
                                    setinfo(true)
                                    setcompo(false)
                                }}>

                                <Text style={{ fontSize: 16, fontWeight: "400", color: COLORS.white, letterSpacing: 2, textAlign: "center" }}>
                                    Infomation
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                borderRightWidth: 1, borderBottomWidth: 1, borderColor: COLORS.white, height: 40, width: 200
                            }}
                                onPress={() => {
                                    setinfo(false)
                                    setcompo(true)
                                }}>

                                <Text style={{ fontSize: 16, fontWeight: "400", color: COLORS.white, letterSpacing: 2, textAlign: "center" }}>
                                    Composition
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 160, width: 300, margin: 10 }}>

                            {getinfo && (
                                <View style={{}}>
                                    <Text style={{ fontSize: 16, fontWeight: "400", color: COLORS.white }}>{product.infomation}</Text>
                                </View>
                            )}
                            {getcompo && (
                                <View style={{ margin: 10 }}>
                                    <Text style={{ fontSize: 16, fontWeight: "400", color: COLORS.white }}>{product.composition}</Text>
                                </View>
                            )}
                        </View>

                        {resp?
                        <TouchableOpacity
                        style={{
                            width: "100%",
                            height: 80,
                            backgroundColor: COLORS.white,
                            marginTop: 10,
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
                            ADDED
                        </Text>
                    </TouchableOpacity>:

                        <TouchableOpacity
                            style={{
                                width: "100%",
                                height: 80,
                                backgroundColor: COLORS.primary,
                                marginTop: 10,
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
                                ADD TO Cart • $ {product.price}
                            </Text>
                        </TouchableOpacity>}



                    </ImageBackground>
                </View>

            </ScrollView>
        )
    }


    const Filter = () => {
        return (
            <View style={[styles.container, { backgroundColor: COLORS.black }]}>

            </View>
        )
    }

    const Sort = () => {
        return (
            <View style={[styles.container, { backgroundColor: COLORS.black }]}>






            </View>
        )
    }
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="DiscoverScreen1" component={DiscoverScreen1} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="ShopScreen" component={ShopScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="Filter" component={Filter} />
            <Stack.Screen name="Sort" component={Sort} />



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
    coverPhoto: {
        width: "100%",
        height: "100%",
        borderRadius: 5,



    },

    coverButton: {
        width: "100%",
        height: 200,
        borderRadius: 5,
        marginTop: 10

    },
    text1: {
        letterSpacing: 3,
        fontSize: 20,
        fontWeight: "400",
        color: COLORS.white,
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 1,
        margin: 10,
        marginTop: 40
    },
    text: {
        color: "white",
        fontSize: 32,
        fontWeight: "400",
        textAlign: "center",
        marginRight: 75
    },
    categoriesListContainer: {

        paddingHorizontal: 2,
    },
    categoryBtn: {
        height: 45,
        width: 100,
        marginRight: 3,
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',
        paddingVertical: 2,
        margin: 9
    },
    carts: {
        backgroundColor: COLORS.black,
        borderRadius: 5,
        width: 147,
        height: 270,
        margin: 12,
        padding: 5,

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        flexWrap: 'wrap',
        flexBasis: '50%',
    },
    productImg: {
        resizeMode: 'cover',
        height: 204,
        width: 159,
        marginRight: 'auto',
        marginLeft: 'auto',
        borderRadius: 5
    },
    prdtext1: {
        fontWeight: '400',
        fontSize: 13,
        marginTop: 9,
        marginLeft: 9,
        color: COLORS.white,
        textAlign: "center",
        letterSpacing: 1
    },
    prdtext2: {
        fontWeight: '400',
        fontSize: 13,
        marginTop: 9,
        marginLeft: 9,
        color: COLORS.primary,
        textAlign: "center"


    },
    banner: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        backgroundColor: COLORS.black,
        height: 80,
        padding: 6,
        paddingVertical: 10,
        justifyContent: "flex-end",
        alignItems: "center",
        shadowColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 15,
    },
    backimg: {
        height: "100%",
        width: "100%",


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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.black,
    },
    modalView: {
        margin: 20,
        backgroundColor: COLORS.black,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },


});