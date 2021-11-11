import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const UserResult = ({ newFriend, handleSendFriendRequest }) => {
    const [pressed, setPressed] = useState(false);

    const handleAddFriendButtonPress = () => {
        handleSendFriendRequest(newFriend._id);
        setPressed(true);
    }

    return (
        <View style={styles.resultContainer}>
            <View>
                <Text style={styles.userMain}>{newFriend.name}</Text>
                <Text style={styles.userSecondary}>{newFriend.email}</Text>
            </View>
            <TouchableOpacity
                style={pressed ? styles.addFriendButtonDisabled : styles.addFriendButtonActive}
                onPress={handleAddFriendButtonPress}
            >
                <Text style={styles.addFriendButtonText}>{pressed ? 'Sent' : 'Add Friend'}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
    addFriendButtonActive: {
        backgroundColor: "black",
        paddingVertical: 7.5,
        paddingHorizontal: 15,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    addFriendButtonDisabled: {
        backgroundColor: "grey",
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

export default UserResult;