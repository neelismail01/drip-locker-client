import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from 'react-native-elements'

const FeedHeader = ({ handleGoToNotifications }) => {

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.header}>Friends</Text>
            <Icon
                name={'notifications-none'}
                type={'material'}
                size={22}
                onPress={handleGoToNotifications}
            />
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