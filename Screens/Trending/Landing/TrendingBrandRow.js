import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const TrendingBrandRow = ({ rank, brand }) => {
  return (
    <View style={styles.brandRowContainer}>
      <View style={styles.brandRow}>
        <View style={styles.brandDetails}>
          <Text>{rank}</Text>
          {brand.brandLogo !== "" ? (
            <Image
              source={{
                uri: brand.brandLogo,
              }}
              style={styles.brandLogo}
            />
          ) : (
            <Icon
              name="store-alt"
              type="font-awesome-5"
              color="white"
              size={12}
            />
          )}
          <View style={styles.brandNameAndWebsite}>
            <Text style={styles.brandName}>{brand.brandName}</Text>
            <Text style={styles.brandWebsite}>{brand.brandWebsite}</Text>
          </View>
        </View>
        <View style={styles.brandStatsContainer}>
          <Text style={styles.brandStats}>
            {brand.totalLikes}
          </Text>
          <Icon
              name="favorite"
              type="material"
              size={12}
            />
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  brandRowContainer: {
    paddingHorizontal: 20,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  brandDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandLogo: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: "contain",
    marginHorizontal: 20,
    backgroundColor: "white"
  },
  brandNameAndWebsite: {
    height: 50,
    justifyContent: "space-evenly"
  },
  brandName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  brandWebsite: {
    color: "grey",
    fontSize: 12,
  },
  brandStatsContainer: {
    flexDirection: "row",
    backgroundColor: "#efefef",
    borderRadius: 5,
    padding: 5,
    width: 65,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  brandStats: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
  },
  separator: {
    borderBottomColor: "#efefef",
    borderBottomWidth: 1,
    marginVertical: 20
  },
});

export default TrendingBrandRow;
