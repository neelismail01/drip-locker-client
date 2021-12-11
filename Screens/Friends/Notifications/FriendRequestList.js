import React from "react";
import { View, StyleSheet } from "react-native";
import ReceivedRequestsResult from '../../../components/ReceivedRequestsResult';

const FriendRequestList = ({ friendRequests, handleAcceptFriendRequest, handleGoToFriendProfile }) => {

    return (
        <View style={styles.listContainer}>
            {
                friendRequests.map(request => {
                    return (
                        <ReceivedRequestsResult
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
};

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 20
    }
})

export default FriendRequestList;