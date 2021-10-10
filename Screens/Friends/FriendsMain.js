import React, { useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, Text } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { BASE_URL } from "@env";
import { useSelector } from 'react-redux';
import { selectUserId } from '../../Redux/userSlice';

import FriendOrderCard from './FriendOrderCard';

const OrdersMain = () => {
    const [friendOrders, setFriendOrders] = useState([]);

    const userId = useSelector(selectUserId);

    useFocusEffect(
        useCallback(() => {
            axios.get(`${BASE_URL}orders/friendOrders/${userId}`)
            .then((res) => {
                setFriendOrders(res.data);
                console.log(res.data[0]);
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
            <ScrollView
            >
                <Text style={styles.header}>Friend Orders</Text>
                {
                    friendOrders.length > 0 &&
                    <View style={styles.sectionContainer}>
                        {
                            friendOrders.map(order => {
                                return (
                                    <FriendOrderCard
                                        key={order._id}
                                        order={order}
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
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginLeft: 20,
        marginTop: 20
    }
});

export default OrdersMain;