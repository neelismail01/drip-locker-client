import React, { useState, useCallback } from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { BASE_URL } from "@env";

import ProfileHeader from './ProfileHeader';
import OrdersGrid from './OrdersGrid';

const ProfileMain = ({ route }) => {
    const [friendOrders, setFriendOrders] = useState([]);
    const { friendUserId, friendName } = route.params;

    useFocusEffect(
        useCallback(() => {

            // get friend orders
            axios.get(`${BASE_URL}orders/${friendUserId}`)
            .then((res) => {
                setFriendOrders(res.data);
                console.log("friend orders", res.data);
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
            <ScrollView>
                <ProfileHeader
                    numberOfOrders={friendOrders.length}
                    friendName={friendName}
                />
                <OrdersGrid
                    orders={friendOrders}
                />
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({

});

export default ProfileMain;