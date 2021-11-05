import React, { useState, useCallback } from "react";
import { ScrollView, SafeAreaView, Button } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { AWS_BASE_URL } from "@env";
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUserId } from '../../../Redux/userSlice';

import FeedHeader from './FeedHeader';
import OrderCard from '../../../components/FeedCard/OrderCard';

const FeedMain = ({ navigation }) => {
    const [friendOrders, setFriendOrders] = useState([]);
    const accessToken = useSelector(selectAccessToken);
    const userId = useSelector(selectUserId)

    const handleGoToFriendSearch = () => {
        navigation.navigate('Add Friend Main')
    }

    useFocusEffect(
        useCallback(() => {

            const getFriendOrders = async () => {
                try {
                    const response = await axios.get(`${AWS_BASE_URL}orders/friends`, { headers: { 'authorization': `Bearer ${accessToken}` } });
                    console.log(response.data.body);
                    setFriendOrders(response.data.body);
                } catch (err) {
                    console.log(err);
                    console.log('Api call error - getting friend orders');
                }
            }

            getFriendOrders();

            return () => {
                setFriendOrders([]);
            };
        }, [])
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <FeedHeader
                handleGoToFriendSearch={handleGoToFriendSearch}
            />
            <ScrollView>
                {
                    friendOrders.map(order => {
                        return (
                            <OrderCard
                                key={order._id}
                                order={order}
                                liked={order.likedBy.includes(userId)}
                                navigation={navigation}
                            />
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
};

export default FeedMain;