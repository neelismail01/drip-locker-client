import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

const ProfileHeader = ({ handleGoToSettings, showSettingsIcon }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.header}>Profile</Text>
            {
                showSettingsIcon &&
                <View style={styles.iconsContainer}>
                    <TouchableOpacity
                        onPress={handleGoToSettings}
                        style={styles.icon}
                    >
                        <Icon name="menu" type="material" color="black" size={22} />
                    </TouchableOpacity>
                </View>
            }
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
    iconsContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        marginLeft: 20
    }
});

export default ProfileHeader;