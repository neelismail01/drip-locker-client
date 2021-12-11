import React from "react";
import { View, StyleSheet, Text } from "react-native";

const TrendingHeader = () => {

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.header}>Trending</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 20
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
    },
});

export default TrendingHeader;