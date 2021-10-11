import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get('window')

const ProfileHeader = ({ numberOfOrders, userName, handleGoToSettings }) => {

    return (
        <View style={styles.headerContainer}>
            <View style={styles.iconsContainer}>
                <TouchableOpacity style={styles.icon}>
                    <Icon name="cloud-upload-alt" type="font-awesome-5" color="black" size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => handleGoToSettings()}
                >
                    <Icon name="cog" type="font-awesome-5" color="black" size={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.topRowContainer}>
                <View style={styles.initialsCircle}>
                    <Text style={styles.initialsText}>
                    {userName.split(" ").map(name => {
                        return name[0]
                    })}
                    </Text>
                </View>
                <Text style={styles.name}>{userName}</Text>
                <View style={styles.userStatsContainer}>
                    <View style={styles.userStats}>
                        <Text style={styles.statValue}>{numberOfOrders}</Text>
                        <Text>Orders</Text>
                    </View>
                    <View style={styles.userStats}>
                        <Text style={styles.statValue}>1000</Text>
                        <Text>Drip Score</Text>
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 20,
        width: width
    },
    iconsContainer: {
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    icon: {
        marginLeft: 15
    },
    topRowContainer: {
        alignItems: "center",
        justifyContent: "space-between"
    },
    initialsCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
    },
    initialsText: {
        color: "white",
        fontSize: 24
    },
    name: {
        marginTop: 15,
        fontSize: 16,
    },
    userStatsContainer: {
        flexDirection: "row",
        marginVertical: 15
    },
    userStats: {
        alignItems: "center",
        marginHorizontal: 15
    },
    statValue: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5
    },
    quickFactsContainer: {
        marginTop: 25
    },
    quickFact: {
        marginVertical: 10
    }
});

export default ProfileHeader;