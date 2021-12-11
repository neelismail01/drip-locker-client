import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from 'react-native-elements'

const NotificationsHeader = ({ navigation }) => {

    return (
        <View style={styles.headerContainer}>
            <Icon
                name={'chevron-left'}
                type={'material'}
                size={28}
                onPress={() => navigation.goBack()}
            />
            <Text style={styles.header}>Friend Requests</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginHorizontal: 15,
        marginBottom: 10
    },
    header: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10
    },
});

export default NotificationsHeader;