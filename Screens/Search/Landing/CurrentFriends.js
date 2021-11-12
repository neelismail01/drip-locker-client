import React from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";

const CurrentFriends = ({ friends, userId, handleGoToFriendProfile }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Friends</Text>
            <ScrollView horizontal contentContainerStyle={{ paddingVertical: 10 }}>
                {
                    friends.map(friend => {
                        const friendData = userId === friend.requester._id ? friend.recipient : friend.requester
                        return (
                            <TouchableOpacity
                                key={friendData._id}
                                style={styles.friendContainer}
                                onPress={() => handleGoToFriendProfile(friendData._id, friendData.name)}
                            >
                                <View style={styles.initialsCircle}>
                                    <Text style={styles.initialsText}>
                                    {friendData.name.split(" ").map(name => {
                                        return name[0]
                                    })}
                                    </Text>
                                </View>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.name}>{friendData.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginVertical: 10
    },
    header: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10
    },
    friendContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20
    },
    initialsCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        marginVertical: 10
    },
    initialsText: {
        color: "white",
        fontSize: 24
    },
    nameContainer: {
        flexWrap: "wrap"
    },
    name: {
        fontSize: 14
    },
})

export default CurrentFriends;