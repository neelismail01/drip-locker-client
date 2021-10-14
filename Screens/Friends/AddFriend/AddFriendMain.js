import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";

import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectUserId } from '../../../Redux/userSlice';

import { BASE_URL } from "@env";

const AddFriendMain = ({ navigation }) => {
    const [noInteraction, setNoInteraction] = useState([]);
    const [receivedRequest, setReceivedRequest] = useState([]);
    const [sentRequest, setSentRequest] = useState([]);
    const [alreadyFriends, setAlreadyFriends] = useState([]);

    const userId = useSelector(selectUserId);

    const handleFriendSearch = async name => {
        try {
            if (name.length > 2) {
                const result = await axios.get(`${BASE_URL}friends/search/${userId}?searchTerm=${name}`)
                setReceivedRequest(result.data.userRecievedRequest)
                setSentRequest(result.data.userSentRequest)
                setAlreadyFriends(result.data.userAlreadyFriends)
                setNoInteraction(result.data.userNoInteraction)
            } else if (name.length === 0) {
                setReceivedRequest([])
                setSentRequest([])
                setAlreadyFriends([])
                setNoInteraction([])
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleAddFriend = async result => {
        try {
            const friendship = {
                requester: userId,
                recipient: result.user._id
            }
            await axios.post(`${BASE_URL}friends/addFriend`, friendship)
            const response = await axios.get(`${BASE_URL}friends/search/${userId}?searchTerm=${name}`)
            setReceivedRequest(response.data.userRecievedRequest)
            setSentRequest(response.data.userSentRequest)
            setAlreadyFriends(response.data.userAlreadyFriends)
            setNoInteraction(response.data.userNoInteraction)
        } catch (err) {
            console.log(err);
        }
    }

    const handleAcceptFriendRequest = async result => {
        try {
            // await axios.put(`${BASE_URL}friends/acceptFriendRequest`, { friendId: result.friendId});
            
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView
                contentContainerStyle={{ padding: 20 }}
            >
                <TextInput
                    placeholder="Add friends on OrderBud..."
                    style={styles.enterAddressField}
                    onChangeText={name => handleFriendSearch(name)}
                />
                {
                    receivedRequest.map(result => {
                        return (
                            <View
                                key={result.user._id}
                                style={styles.resultContainer}
                            >
                                <View style={styles.userDetails}>
                                    <Text style={styles.userMain}>{result.user.name}</Text>
                                    <Text style={styles.userSecondary}>{result.user.email}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.addFriendButton}
                                    onPress={() => handleAcceptFriendRequest(result)}
                                >
                                    <Text style={styles.addFriendButtonText}>Accept</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
                {
                    alreadyFriends.map(result => {
                        return (
                            <View
                                key={result.user._id}
                                style={styles.resultContainer}
                            >
                                <View style={styles.userDetails}>
                                    <Text style={styles.userMain}>{result.user.name}</Text>
                                    <Text style={styles.userSecondary}>{result.user.email}</Text>
                                </View>
                                <View style={styles.alreadyFriendsButton}>
                                    <Text style={styles.alreadyFriendsButtonText}>Friends</Text>
                                </View>
                            </View>
                        )
                    })
                }
                {
                    sentRequest.map(result => {
                        return (
                            <View
                                key={result.user._id}
                                style={styles.resultContainer}
                            >
                                <View style={styles.userDetails}>
                                    <Text style={styles.userMain}>{result.user.name}</Text>
                                    <Text style={styles.userSecondary}>{result.user.email}</Text>
                                </View>
                                <View style={styles.pendingFriendButton}>
                                    <Text style={styles.addFriendButtonText}>Sent</Text>
                                </View>
                            </View>
                        )
                    })
                }
                {
                    noInteraction.map(result => {
                        return (
                            <View key={result.user._id} style={styles.resultContainer}>
                                <View style={styles.userDetails}>
                                    <Text style={styles.userMain}>{result.user.name}</Text>
                                    <Text style={styles.userSecondary}>{result.user.email}</Text>
                                </View>
                                <TouchableOpacity style={styles.addFriendButton} onPress={() => handleAddFriend(result)}>
                                    <Text style={styles.addFriendButtonText}>Add Friend</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    enterAddressField: {
        backgroundColor: "white",
        padding: 15,
        fontSize: 16,
        shadowColor: '#a6a6a6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        fontSize: 14,
        borderRadius: 15,
        marginVertical: 10
    },
    resultContainer: {
        backgroundColor: "white",
        paddingVertical: 15,
        borderBottomWidth: 0.25,
        borderBottomColor: "grey",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    userDetails: {
        marginHorizontal: 10
    },
    userMain: {
        fontSize: 16,
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
        borderRadius: 10,
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
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    alreadyFriendsButtonText: {
        color: "black",
        fontWeight: "bold"
    },
    pendingFriendButton: {
        backgroundColor: "grey",
        paddingVertical: 7.5,
        paddingHorizontal: 15,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default AddFriendMain;