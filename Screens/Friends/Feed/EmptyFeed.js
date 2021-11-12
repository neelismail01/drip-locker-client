import React from "react";
import { View, StyleSheet, Text } from "react-native";

const EmptyFeed = () => {

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.header}>No Posts Yet</Text>
                <Text style={styles.subHeader}>
                    Add more friends to get inspired by what they are buying.
                </Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    textContainer: {
        width: "66%",
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 10
    },
    subHeader: {
        textAlign: "center"
    }
})

export default EmptyFeed;