import React from "react";
import { StyleSheet, ScrollView, View, Text} from "react-native";

const ProductTags = ({ order }) => {

  return (
    <ScrollView
        horizontal
        style={styles.horizontalScroll}
    >
        {
            order.tags.map((tag, index) => {
                return (
                    <View key={index} style={styles.tagContainer}>
                        <Text style={styles.tag}>{tag}</Text>
                    </View>
                )
            })
        }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    horizontalScroll: {
        margin: 10
    },
    tagContainer: {
        backgroundColor: "#efefef",
        padding: 5,
        marginRight: 10,
        borderRadius: 2.5
    },
    tag: {
        fontSize: 12
    }
});

export default ProductTags;