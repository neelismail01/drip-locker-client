import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

const ProfileHeader = ({ numberOfOrders, friendName }) => {

    return (
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Profile</Text>
                <TouchableOpacity
                    style={styles.icon}
                >
                    <Icon name="search" type="font-awesome-5" color="black" size={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.topRowContainer}>
                <View style={styles.initialsCircle}>
                    <Text style={styles.initialsText}>
                    {friendName.split(" ").map(name => {
                        return name[0]
                    })}
                    </Text>
                </View>
                <Text style={styles.name}>{friendName}</Text>
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 20
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
    },
    icon: {
        marginLeft: 20
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