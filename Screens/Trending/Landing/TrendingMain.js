import React, { useState, useCallback } from "react";
import {
  SafeAreaView
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { AWS_BASE_URL } from "../../../util/common";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../Redux/userSlice";

import TrendingHeader from "./TrendingHeader";
import TrendingBrands from "./TrendingBrands";

const TrendingMain = () => {
  const [trendingBrands, setTrendingBrands] = useState([]);
  const [loading, setLoading] = useState(true);
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
      axios
        .get(`${AWS_BASE_URL}orders/trending/brands`, config)
        .then(response => {
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

export default TrendingMain;
