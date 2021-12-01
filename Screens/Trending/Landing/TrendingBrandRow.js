import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
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
            <Text style={styles.brandStats}>
              {brand.totalPosts} {brand.totalPosts === 1 ? "Post" : "Posts"}{" "}
              {"&"} {brand.totalLikes}{" "}
              {brand.totalLikes === 1 ? "Like" : "Likes"}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.shopButton}>
          <Text style={styles.shopText}>Shop</Text>
        </TouchableOpacity>
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
    justifyContent: "space-between",
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
  separator: {
    borderBottomColor: "#efefef",
    borderBottomWidth: 1,
    marginVertical: 20
  },
});

export default TrendingBrandRow;
