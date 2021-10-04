import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { BASE_URL } from "@env";
import { useSelector } from 'react-redux';
import { selectUserId } from '../../Redux/userSlice';

import OrderCard from './OrderCard';


const OrdersMain = (props) => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [ordersCount, setOrdersCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const userId = useSelector(selectUserId);

    useFocusEffect(
        useCallback(() => {

            //User Orders
            axios.get(`${BASE_URL}orders/${userId}`)
            .then((res) => {
                setPendingOrders(res.data.filter(order => order.status === "Pending"));
                setCompletedOrders(res.data.filter(order => order.status === "Completed"));
                setOrdersCount(pendingOrders.length + completedOrders.length);
                setLoading(false);
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
        <View style={styles.container}>
            <ScrollView>
                {
                    pendingOrders.length > 0 &&
                    <View style={styles.sectionContainer}>
                        <Text style={styles.header}>Current Orders</Text>
                        {
                            pendingOrders.map(order => {
                                return (
                                    <OrderCard
                                        key={order.id}
                                        navigation={props.navigation}
                                        order={order}
                                        ordersCount={ordersCount}
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
                                        navigation={props.navigation}
                                        order={order}
                                        ordersCount={ordersCount}
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
        padding: 20
    },
    sectionContainer: {
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