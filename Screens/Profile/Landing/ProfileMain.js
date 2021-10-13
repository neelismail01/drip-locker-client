import React, { useState, useCallback } from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { BASE_URL } from "@env";

import { useSelector } from "react-redux";
import { selectUserInfo } from '../../../Redux/userSlice';

import ProfileHeader from './ProfileHeader';
import OrdersGrid from './OrdersGrid';

const ProfileMain = ({ navigation }) => {
    const [orders, setOrders] = useState([]);
    const userInfo = useSelector(selectUserInfo);

    const handleGoToSettings = () => {
        navigation.navigate('Settings Main')
    }

    const handleGoToOrdersFeed = (order) => {
        navigation.navigate('Orders Feed Main', { orders, order })
    }

    useFocusEffect(
        useCallback(() => {

            // get friend orders
            axios.get(`${BASE_URL}orders/${userInfo.id}`)
            .then((res) => {
                setOrders(res.data);
            })
            .catch((error) => {
                console.log(error);
                console.log('Api call error - getting friend orders');
            })

            return () => {
                setOrders([]);
            };

        }, [])
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView>
                <ProfileHeader
                    numberOfOrders={orders.length}
                    userName={userInfo.name}
                    handleGoToSettings={handleGoToSettings}
                />
                <OrdersGrid
                    orders={orders}
                    handleGoToOrdersFeed={handleGoToOrdersFeed}
                />
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({

});

export default ProfileMain;