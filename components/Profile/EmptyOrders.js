import React from "react";
import { View, StyleSheet, Text } from "react-native";

const EmptyOrders = ({ loading, showPostPrompt }) => {

    return (
        !loading &&
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.header}>No Posts Yet</Text>
                {
                    showPostPrompt &&
                    <Text style={styles.subHeader}>
                        Post pictures of your purchases to inspire your friends.
                    </Text>
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25
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

export default EmptyOrders;