import React from "react";
import {
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import TrendingBrandRow from "./TrendingBrandRow";

const TrendingBrands = ({
  loading,
  refreshing,
  trendingBrands,
  handleRefresh,
}) => {
  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      {trendingBrands.map((brand, index) => {
        return (
          <TrendingBrandRow key={index} rank={index + 1} brand={brand} />
        );
      })}
    </ScrollView>
  );
};

export default TrendingBrands;
