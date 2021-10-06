import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { BASE_URL } from "@env";
import { useSelector } from 'react-redux';
import { selectUserId } from '../../Redux/userSlice';

import OrderCard from './OrderCard';


const OrdersMain = ({ navigation }) => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    const userId = useSelector(selectUserId);

    useFocusEffect(
        useCallback(() => {
            axios.get(`${BASE_URL}orders/${userId}`)
            .then((res) => {
                setPendingOrders(res.data.filter(order => order.status === "Pending"));
                setCompletedOrders(res.data.filter(order => order.status === "Completed"));
            })
            .catch((error) => {
                console.log(error);
                console.log('Api call error - getting orders');
            })

            return () => {
                setPendingOrders([]);
                setCompletedOrders([]);
            };
        }, [])
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.orderContainer}>
                <ScrollView>
                    {
                        pendingOrders.length > 0 &&
                        <View>
                            <Text style={styles.header}>Current Orders</Text>
                            {
                                pendingOrders.map(order => {
                                    return (
                                        <OrderCard
                                            key={order.id}
                                            navigation={navigation}
                                            order={order}
                                        />
                                    )
                                })
                            }
                        </View>
                    }
                    {
                        completedOrders.length > 0 &&
                        <View>
                            <Text style={[styles.header, { marginTop: 30 }]}>Completed Orders</Text>
                            {
                                completedOrders.map(order => {
                                    return (
                                        <OrderCard
                                            key={order.id}
                                            navigation={navigation}
                                            order={order}
                                        />
                                    )
                                })
                            }
                        </View>
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    orderContainer: {
        padding: 20
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