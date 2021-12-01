import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { AWS_BASE_URL } from "@env";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../Redux/userSlice";

import TrendingHeader from "./TrendingHeader";
import TrendingBrands from "./TrendingBrands";

const TrendingMain = () => {
  const [trendingBrands, setTrendingBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const accessToken = useSelector(selectAccessToken);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const handleRefresh = () => {
    setRefreshing(true);
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      axios
        .get(`${AWS_BASE_URL}orders/trending/brands`, config)
        .then((response) => {
          setTrendingBrands(response.data.body);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
          setRefreshing(false);
        });
    }, [refreshing])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <TrendingHeader />
      <TrendingBrands
        loading={loading}
        refreshing={refreshing}
        trendingBrands={trendingBrands}
        handleRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  trendingBrandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  brandDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandLogo: {
    height: 50,
    width: 50,
    resizeMode: "contain",
    marginHorizontal: 20,
  },
  brandName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  brandNameAndWebsite: {
    height: "auto",
  },
  brandStats: {
    color: "grey",
    fontSize: 12,
  },
  shopButton: {
    backgroundColor: "#efefef",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  shopText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default TrendingMain;
