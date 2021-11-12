import React from "react";
import { View, StyleSheet, Text } from "react-native";

import UserSearchResult from './UserSearchResult';

const SearchResults = ({ newFriends, handleSendFriendRequest }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add New Friends</Text>
            {
                newFriends.map(newFriend => {
                    return (
                        <UserSearchResult
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