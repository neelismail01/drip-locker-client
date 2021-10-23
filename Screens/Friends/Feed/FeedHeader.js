import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

const FeedHeader = ({ handleGoToFriendSearch }) => {

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.header}>Friends</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity
                    onPress={handleGoToFriendSearch}
                    style={styles.icon}
                >
                    <Icon name="user-plus" type="font-awesome-5" color="black" size={18} />
                </TouchableOpacity>
            </View>
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
    iconContainer: {
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    icon: {
        marginLeft: 20
    }
});

export default FeedHeader;