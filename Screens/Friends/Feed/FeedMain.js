import React, { useState, useCallback } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { BASE_URL } from "@env";
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../Redux/userSlice';

import FeedHeader from './FeedHeader';
import FriendOrderCard from './FriendOrderCard';

const FeedMain = ({ navigation }) => {
    const [friendOrders, setFriendOrders] = useState([]);
    const userId = useSelector(selectUserId);

    const handleGoToFriendSearch = () => {
        navigation.navigate('Add Friend Main')
    }

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
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <FeedHeader
                handleGoToFriendSearch={handleGoToFriendSearch}
            />
            <ScrollView>
                {
                    friendOrders.map(order => {
                        return (
                            <FriendOrderCard
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