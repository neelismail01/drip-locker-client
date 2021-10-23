import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

const StoreBar = ({ order }) => {
  return (
      <TouchableOpacity style={styles.storeNameContainer}>
        <View style={styles.storeIconAndNameContainer}>
          <Icon name="store-alt" type="font-awesome-5" color="white" size={12} />
          <Text style={styles.storeName}>{order.business.name}</Text>
        </View>
        <Icon name="angle-right" type="font-awesome-5" color="white" size={14} />
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  storeNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "black",
    paddingVertical: 7.5,
    paddingHorizontal: 15
  },
  storeIconAndNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  storeName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 10
  }
});

export default StoreBar;