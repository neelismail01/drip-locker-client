import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ProfileHeader = ({ numberOfOrders, friendName, dripScore }) => {

    return (
        <View>
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
                        <Text style={styles.statValue}>{dripScore}</Text>
                        <Text>Drip Score</Text>
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
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