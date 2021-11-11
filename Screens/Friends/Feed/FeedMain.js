import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { AWS_BASE_URL } from "@env";
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUserId } from '../../../Redux/userSlice';

import FeedHeader from './FeedHeader';
import NonEmptyFeed from './NonEmptyFeed';
import EmptyFeed from './EmptyFeed';

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
                    const config = {
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${accessToken}`
                        }
                    }
                    const response = await axios.get(`${AWS_BASE_URL}orders/friends`, config);
                    if (response.status === 200) {
                        setFriendOrders(response.data.body);
                    }
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
            {
                friendOrders.length > 0 ?
                <NonEmptyFeed
                    friendOrders={friendOrders}
                    navigation={navigation}
                    userId={userId}
                /> :
                <EmptyFeed />
            }
        </SafeAreaView>
    )
};

export default FeedMain;