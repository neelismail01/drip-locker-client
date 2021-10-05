import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
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
        <View style={styles.container}>
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
                                    />
                                )
                            })
                        }
                    </View>
                }
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        paddingVertical: 10,
        marginTop: 15
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10
    }
});

export default OrdersMain;