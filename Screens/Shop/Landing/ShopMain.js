import React, { useState, useCallback } from "react";
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from "react-native";
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios';
import { BASE_URL } from "@env";

import Header from './Header';
import BrandCard from "./BrandCard";

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView
            contentContainerStyle={{paddingHorizontal: 20}}
        >
            <Header />
            <View style={styles.rowContainer}>
              <View style={styles.rowHeaderContainer}>
                <Text style={styles.rowHeader}>Top Rated</Text>
                <Text
                  style={styles.rowShowAllButton}
                >
                  Show All
                </Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.rowScroll}
              >
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
              </ScrollView>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.rowHeaderContainer}>
                <Text style={styles.rowHeader}>Men's Clothing</Text>
                <Text
                  style={styles.rowShowAllButton}
                >
                  Show All
                </Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.rowScroll}
              >
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
              </ScrollView>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.rowHeaderContainer}>
                <Text style={styles.rowHeader}>Home Accessories</Text>
                <Text
                  style={styles.rowShowAllButton}
                >
                  Show All
                </Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.rowScroll}
              >
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
              </ScrollView>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    marginVertical: 15
  },
  rowHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  rowHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rowShowAllButton: {
    fontSize: 14,
  },
  rowScroll: {
    paddingVertical: 10
  }
});

export default ShopMain;