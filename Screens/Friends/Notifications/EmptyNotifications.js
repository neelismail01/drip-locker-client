import React from "react";
import { View, StyleSheet, Text } from "react-native";


const EmptyNotifications = () => {

    return (
        <View style={styles.messageContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.header}>No Friend Requests</Text>
                <Text style={styles.subHeader}>
                    Add some friends to get inspired by what they are buying!
                </Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    messageContainer: {
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        width: "66%",
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 10,
        textAlign: "center"
    },
    subHeader: {
        textAlign: "center"
    }
});

export default EmptyNotifications;