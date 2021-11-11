import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from "react-native-elements";

const EmptyFeed = () => {

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon name="image" type="material" color="black" size={48} />
            </View>
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
    iconContainer: {
        borderWidth: 1,
        borderColor: "black",
        height: 100,
        width: 100,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
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