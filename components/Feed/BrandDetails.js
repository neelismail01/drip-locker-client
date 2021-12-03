import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const PostDetails = ({ order }) => {
  return (
      <View style={styles.brandDetailsContainer}>
        <View style={styles.brandInfo}>
          {
            order.brandLogo !== '' ?
            <Image
              source={{
                uri: order.brandLogo
              }}
              style={styles.brandLogo}
            /> :
            <Icon name="store-alt" type="font-awesome-5" color="white" size={12} />
          }
          <View style={styles.brandNameAndWebsite}>
            <Text style={styles.brandName}>{order.brandName}</Text>
            {
              order.brandWebsite !== '' &&
              <Text style={styles.brandWebsite}>{order.brandWebsite}</Text>
            }
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  brandDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "black",
    paddingVertical: 7.5,
    paddingHorizontal: 10
  },
  brandInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandNameAndWebsite: {
    alignItems: "flex-start",
    marginLeft: 20
  },
  brandLogo: {
    height: 40,
    width: 40,
    borderRadius: 20,
    resizeMode: "contain",
    backgroundColor: "white"
  },
  brandName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  brandWebsite: {
    color: "white",
    fontSize: 12,
  }
});

export default PostDetails;