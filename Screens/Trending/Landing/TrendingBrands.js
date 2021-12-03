import React from "react";
import {
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  View,
  StyleSheet
} from "react-native";

import TrendingBrandRow from "./TrendingBrandRow";

const TrendingBrands = ({
  loading,
  refreshing,
  trendingBrands,
  handleRefresh,
}) => {
  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" />
    </View>
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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default TrendingBrands;
