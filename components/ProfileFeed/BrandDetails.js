import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Icon } from 'react-native-elements';

const PostDetails = ({ order }) => {
  return (
      <TouchableOpacity style={styles.brandDetailsContainer}>
        <View style={styles.brandInfo}>
          {
            order.brandLogo !== '' ?
            <Image
              source={{
                uri: order.brandLogo
              }}
              style={{ height: 50, width: 50 }}
            /> :
            <Icon name="store-alt" type="font-awesome-5" color="white" size={12} />
          }
          <View style={styles.storeNameAndWebsite}>
            <Text style={styles.brandName}>{order.brandName}</Text>
            {
              order.brandWebsite !== '' &&
              <Text style={styles.brandWebsite}>{order.brandWebsite}</Text>
            }
          </View>
        </View>
        <Icon name="angle-right" type="font-awesome-5" color="white" size={14} />
      </TouchableOpacity>
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
  storeNameAndWebsite: {
    alignItems: "flex-start",
    marginLeft: 20
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