import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const SearchResults = ({ newFriends, handleSendFriendRequest }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add New Friends</Text>
            {
                newFriends.map(newFriend => {
                    return (
                        <View key={newFriend._id} style={styles.resultContainer}>
                            <View>
                                <Text style={styles.userMain}>{newFriend.name}</Text>
                                <Text style={styles.userSecondary}>{newFriend.email}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.addFriendButton}
                                onPress={() => handleSendFriendRequest(newFriend._id)}
                            >
                                <Text style={styles.addFriendButtonText}>Add Friend</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginVertical: 20
    },
    resultContainer: {
        backgroundColor: "white",
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    header: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10
    },
    userMain: {
        fontSize: 16,
        fontWeight: "bold"
    },
    userSecondary: {
        color: "grey",
        fontSize: 12,
        marginTop: 7.5
    },
    addFriendButton: {
        backgroundColor: "black",
        paddingVertical: 7.5,
        paddingHorizontal: 15,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    addFriendButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14
    }
})

export default SearchResults;