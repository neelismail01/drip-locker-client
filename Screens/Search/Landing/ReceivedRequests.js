import React from "react";
import { View, StyleSheet, Text } from "react-native";

import RecievedRequestResult from '../../../components/ReceivedRequestsResult';

const ReceivedRequests = ({ receivedRequests, handleAcceptFriendRequest, handleGoToFriendProfile }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Friend Requests</Text>
            {
                receivedRequests.map(request => {
                    return (
                        <RecievedRequestResult
                            key={request._id}
                            request={request}
                            handleAcceptFriendRequest={handleAcceptFriendRequest}
                            handleGoToFriendProfile={handleGoToFriendProfile}
                        />
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
    header: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10
    },
    resultContainer: {
        backgroundColor: "white",
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    userMain: {
        fontSize: 14,
        fontWeight: "bold"
    },
    userSecondary: {
        color: "grey",
        fontSize: 14,
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
    },
    alreadyFriendsButton: {
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        paddingVertical: 7.5,
        paddingHorizontal: 15,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    alreadyFriendsButtonText: {
        color: "black",
        fontWeight: "bold"
    }
})

export default ReceivedRequests;