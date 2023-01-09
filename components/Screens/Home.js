import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import COLORS from '../const/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-community/async-storage';


export default ({ navigation }) => {
    const [products, setproduct] = useState()

   

    
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

              

            })
            .catch((err) => {
                console.error(err);
            });


    };





    useEffect(() => {
        getproduct();
        
    }, []);

    const [homeList, sethomeList] = useState([
        {
            id: 1, name: "Sofa 10 Seater", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. "
            , image: source=(require("../imgs/home1.png")), category: "Sofa"
        },
        { id: 2, name: "Comfortabke Bed", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. ", image:source=(require("../imgs/home.png")), category: "Sofa" },
        { id: 3, name: "Tables", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. ", image: source=(require("../imgs/home.png")), category: "Sofa" },

    ])
    const categories = [
        { id: '1', name: 'All' },
        { id: '2', name: 'Sofas' },
        { id: '3', name: 'Dinning Tables' },
        { id: '4', name: 'Beds' },

    ];
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [selectedCategoryName, setSelectedCategoryName] = useState(0);


    const ListCategories = () => {
        return (
            <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesListContainer}>

                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.8}
                            onPress={() => {
                                setSelectedCategoryIndex(index)
                                setSelectedCategoryName(category.name)
                            }}>
                            <View
                                style={{
                                    backgroundColor:
                                        selectedCategoryIndex == index
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
                                            selectedCategoryIndex == index
                                                ? COLORS.primary
                                                : COLORS.white,
                                    }}>
                                    {category.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
        );
    };
    const Popular = () => {
        console.disableYellowBox = true
    
        return (
          <FlatList
            style={{ width: '100%' }}
            data={products}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View style={styles.row}>
                  <View style={styles.carts}>
                    <Image
                      style={styles.productImg}
                      source={{ uri: item.image }}
                    />
                    
                    <View>
                      <Text style={styles.prdtext1}>{item.name}</Text>
                    </View>
    
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        )
      }
    return (
        <ScrollView>
            <View style={[styles.container, { backgroundColor:COLORS.black}]}>
                

                <Text style={styles.HeaderStyle}>
                    EXQUISITE DESIGN COMBINED WITH FUNCTIONALITIES

                </Text>
                <Text style={styles.text4}>Categories Here</Text>
                <ListCategories />
                <View style={styles.swiper}>
                    <Swiper showButtons={true} autoplay={true} autoplayTimeout={4}>
                        {homeList.map(i => (
                            <Image source={i.image} style={styles.banner2} key={i._id} />
                        ))}
                    </Swiper>
                </View>
                <Text style={styles.text4}>Products Here</Text>
                <Popular/>

                

            </View>
        </ScrollView>
    )





};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    HeaderStyle: {
        fontSize: 34,
        fontWeight: "400",
        color: COLORS.white,
        marginTop: 15,
        marginLeft: 19,
        alignSelf: "flex-start",
        letterSpacing: 5,
        marginRight: 14
    },
    carts: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        width: 147,
        height: 200,
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
        height: 130,
        width: 130,
        borderRadius: 5,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 8,
      },
      prdtext1: {
        fontWeight: '400',
        fontSize: 14,
        textAlign:"center",
        marginTop: 9,
        marginLeft: 9,
      },
    categoriesListContainer: {

        alignItems: 'center',
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
    text4: {
        fontSize: 24,
        alignSelf: "flex-start",
        justifyContent: "flex-start",
        fontWeight: "400",
        marginTop: 30,
        marginLeft: 14,
        letterSpacing: 4,
        color: COLORS.white
    },
    banner2: {
    width: 290,
    height: 290,
    resizeMode: 'contain',
    marginLeft: 30, borderRadius: 20, marginTop: 15, marginBottom: 15
  },
  swiper: {
    width: "100%",
    height:300,
    marginLeft:50,
    position: 'relative',
    marginTop:20
  },


});