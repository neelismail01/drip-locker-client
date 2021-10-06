import React, { useState, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios';
import { BASE_URL } from "@env";

import Header from './Header';
import BrandCard from "./BrandCard";

const { width } = Dimensions.get("window")

const ShopMain = ({ navigation }) => {
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {

      // Businesses
      axios.get(`${BASE_URL}businesses`)
        .then(async (res) => {
            setBusinesses(res.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error)
        })

      // Categories
      axios.get(`${BASE_URL}categories`)
        .then((res) => {
          setCategories(res.data)
        })
        .catch((error) => {
          console.log('Api call error - categories')
          console.log(error);
        })

      return () => {
        setBusinesses([]);
        setCategories([]);
      };
    }, [])
  )

  return (
    <>
        {
            loading === false ? (
                <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                    <ScrollView
                        contentContainerStyle={{paddingHorizontal: 20}}
                    >
                        <Header />
                        <View style={styles.listContainer}>
                        {
                            businesses.map(business => {
                                return (
                                    <BrandCard
                                        key={business.id}
                                        business={business}
                                        navigation={navigation}
                                    />
                                )
                            })
                        }
                        </View>
                    </ScrollView>
                </SafeAreaView>
            ) : (
                <View style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
                    <ActivityIndicator size="large" color="green" />
                </View>
            )
        }
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignItems: "center",
    elevation: 8,
    paddingVertical: 15,
  }
});

export default ShopMain;