import React from "react";
import { View, StyleSheet, Text } from "react-native";

const SearchHeader = () => {

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.header}>Search</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 10
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
    },
});

export default SearchHeader;