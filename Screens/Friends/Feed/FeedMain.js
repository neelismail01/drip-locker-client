import React, { useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { BASE_URL } from "@env";
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../Redux/userSlice';

import FriendOrderCard from './FriendOrderCard';

const FriendSearchMain = ({ navigation }) => {
    const [friendOrders, setFriendOrders] = useState([]);

    const userId = useSelector(selectUserId);

    const handleGoToFriendProfile = (friendUserId, friendName) => {
        navigation.navigate('Friend Profile Main', { friendUserId, friendName })
    }

    const handleGoToFriendSearch = () => {
        navigation.navigate('Add Friend Main')
    }

    useFocusEffect(
        useCallback(() => {
            axios.get(`${BASE_URL}orders/friendOrders/${userId}`)
            .then((res) => {
                console.log(res)
                setFriendOrders(res.data);
            })
            .catch((error) => {
                console.log(error);
                console.log('Api call error - getting friend orders');
            })

            return () => {
                setFriendOrders([]);
            };
        }, [])
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Friends</Text>
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        onPress={handleGoToFriendSearch}
                        style={styles.icon}
                    >
                        <Icon name="user-plus" type="font-awesome-5" color="black" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleGoToFriendSearch}
                        style={styles.icon}
                    >
                        <Icon name="search" type="font-awesome-5" color="black" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                {
                    friendOrders.length > 0 &&
                    <View style={styles.sectionContainer}>
                        {
                            friendOrders.map(order => {
                                return (
                                    <FriendOrderCard
                                        key={order._id}
                                        order={order}
                                        handleGoToFriendProfile={handleGoToFriendProfile}
                                    />
                                )
                            })
                        }
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 10
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
    },
    iconContainer: {
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    icon: {
        marginLeft: 20
    }
});

export default FriendSearchMain;