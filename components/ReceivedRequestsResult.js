import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const RecievedRequestResult = ({ request, handleAcceptFriendRequest, handleGoToFriendProfile }) => {
    const [pressed, setPressed] = useState(false);

    const handleButtonPress = () => {
        if (!pressed) {
            handleAcceptFriendRequest(request);
            setPressed(true);
        } else {
            handleGoToFriendProfile(request.requester._id, request.requester.name)
        }
    }

    return (
        <View style={styles.resultContainer}>
           <View>
                <Text style={styles.userMain}>{request.requester.name}</Text>
                <Text style={styles.userSecondary}>{request.requester.email}</Text>
            </View>
            <TouchableOpacity
                style={styles.addFriendButton}
                onPress={handleButtonPress}
            >
                <Text style={styles.addFriendButtonText}>{pressed ? 'Go To Profile' : 'Accept'}</Text>
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

export default RecievedRequestResult;