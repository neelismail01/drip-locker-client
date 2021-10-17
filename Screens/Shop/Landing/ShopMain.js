import React, { useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios';
import { BASE_URL } from "@env";

import Header from './Header';
import BrandCard from "./BrandCard";

const ShopMain = ({ navigation }) => {
  const [businesses, setBusinesses] = useState([]);

  useFocusEffect(
    useCallback(() => {

      // Businesses
      axios.get(`${BASE_URL}businesses`)
        .then(async (res) => {
            setBusinesses(res.data);
        })
        .catch((error) => {
            console.log(error)
        })

      return () => {
        setBusinesses([]);
      };
    }, [])
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Header />
        <ScrollView
            contentContainerStyle={{paddingHorizontal: 20}}
        >
            <View style={styles.gridOfBusinesses}>
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
  );
};

const styles = StyleSheet.create({
  gridOfBusinesses: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default ShopMain;