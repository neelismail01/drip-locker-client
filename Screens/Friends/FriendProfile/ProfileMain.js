import React, { useState, useCallback } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { BASE_URL } from "@env";

import ProfileHeader from './ProfileHeader';
import OrdersGrid from './OrdersGrid';

const ProfileMain = ({ navigation, route }) => {
    const [friendOrders, setFriendOrders] = useState([]);
    const { friendUserId, friendName } = route.params;

    const handleGoToFriendOrdersFeed = (order) => {
        navigation.navigate('Friend Orders Feed Main', { friendOrders, order })
    }

    useFocusEffect(
        useCallback(() => {

            // get friend orders
            axios.get(`${BASE_URL}orders/${friendUserId}`)
            .then((res) => {
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
                <Text style={styles.header}>Profile</Text>
                <TouchableOpacity
                    style={styles.icon}
                >
                    <Icon name="search" type="font-awesome-5" color="black" size={20} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <ProfileHeader
                    numberOfOrders={friendOrders.length}
                    friendName={friendName}
                />
                <OrdersGrid
                    orders={friendOrders}
                    handleGoToFriendOrdersFeed={handleGoToFriendOrdersFeed}
                />
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
    icon: {
        marginLeft: 20
    },
});

export default ProfileMain;