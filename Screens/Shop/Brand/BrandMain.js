import React, { useState, useCallback } from 'react'
import { View, ScrollView, StyleSheet, SafeAreaView, Dimensions, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios';
import { BASE_URL } from "@env";

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../Redux/cartSlice';

import BrandInfo from './BrandInfo';
import BrandCategories from './BrandCategories';
import BrandProducts from './BrandProducts'

import ViewCartButton from '../Cart/ViewCartButton';

const { width, height } = Dimensions.get('window')

const BrandMain = ({ navigation, route }) => {
    const [products, setProducts] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [loading, setLoading] = useState(true)

    const { name, rating, categories, id } = route.params;
    const businessDetails = { name, rating };
    const cart = useSelector(selectCartItems);

    const goToProductPage = (product) => {
        navigation.navigate('Product Main', { product })
    }

    useFocusEffect(
        useCallback(() => {
            axios.get(`${BASE_URL}products/${id}`)
                .then(res => {

                    let filters = []

                    for (let i = 0; i < categories.length; i++) {
                        for (let j = 0; j < res.data.length; j++) {
                            if (res.data[j].category._id === categories[i]._id) {
                                filters.push(categories[i]);
                                break;
                            }
                        }
                    }

                    setFilteredCategories(filters);
                    setProducts(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                })
        }, [])
    )

    return (
        <>
            {
                loading === false ?
                <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                    <ScrollView>
                        <BrandInfo businessDetails={businessDetails} />
                        <View style={styles.categoriesContainer}>
                            <BrandCategories categories={filteredCategories} />
                        </View>
                        <BrandProducts
                            products={products}
                            categories={filteredCategories}
                            goToProductPage={goToProductPage}
                        />
                    </ScrollView>
                    {
                        cart.length > 0 &&
                        <ViewCartButton navigation={navigation} />
                    }
                </SafeAreaView> : 
                <SafeAreaView style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
                    <Text>Loading</Text>
                </SafeAreaView>
            }
        </>
    )
}

const styles = StyleSheet.create({
    coverPhoto: {
        width: width,
        height: height * 0.225,
    },
    categoriesContainer: {
        backgroundColor: "white",
        paddingLeft: 15
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default BrandMain;