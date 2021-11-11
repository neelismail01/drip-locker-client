import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import UserResult from './UserResult';

const SearchResults = ({ newFriends, handleSendFriendRequest }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add New Friends</Text>
            {
                newFriends.map(newFriend => {
                    return (
                        <UserResult
                            key={newFriend._id}
                            newFriend={newFriend}
                            handleSendFriendRequest={handleSendFriendRequest}
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
    }
})

export default SearchResults;