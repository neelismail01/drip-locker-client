import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Caption = ({ order }) => {

  return (
    <View style={styles.captionContainer}>
        <Text>{order.caption}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    captionContainer: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
});

export default Caption;