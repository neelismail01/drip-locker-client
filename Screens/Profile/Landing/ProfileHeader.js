import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

const ProfileHeader = ({ handleGoToSettings }) => {

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.header}>Profile</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity
                    onPress={handleGoToSettings}
                    style={styles.icon}
                >
                    <Icon name="cog" type="font-awesome-5" color="black" size={20} />
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

export default ProfileHeader;