import React, { useState, useCallback } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { BASE_URL } from "@env";

import ProfileHeader from '../../../components/Profile/ProfileHeader';
import ProfileInformation from '../../../components/Profile/ProfileInformation';
import OrdersGrid from '../../../components/Profile/OrdersGrid';
import OrdersFilter from '../../../components/Profile/OrdersFilter';

const ProfileMain = ({ route, navigation }) => {
    const [myOrders, setMyOrders] = useState([]);
    const [likedOrders, setLikedOrders] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [dripScore, setDripScore] = useState();

    const { friendUserId, friendName } = route.params;

    const handleGoToSettings = () => {
        navigation.navigate('Settings Main')
    }

    const handleGoToOrdersFeed = (order) => {
        const orders = (activeTab === 0 ? myOrders : likedOrders)
        navigation.navigate('Orders Feed Main', { orders, order })
    }

    const handleChangeToOrdersTab = () => {
        if (activeTab !== 0) {
            setActiveTab(0)
            axios.get(`${BASE_URL}orders/${friendUserId}`)
            .then((res) => {
                setMyOrders(res.data);
            })
            .catch((error) => {
                console.log(error);
                console.log('Api call error - getting orders');
            })
        }
    }

    const handleChangeToLikedTab = () => {
        if (activeTab !== 1) {
            setActiveTab(1)
            axios.get(`${BASE_URL}orders/liked/${friendUserId}`)
            .then((res) => {
                setLikedOrders(res.data);
            })
            .catch((error) => {
                console.log(error);
                console.log('Api call error - getting liked orders');
            })
        }
    }

    useFocusEffect(
        useCallback(() => {
            // get orders
            axios.get(`${BASE_URL}orders/${friendUserId}`)
            .then((res) => {
                setMyOrders(res.data);
            })
            .catch((error) => {
                console.log(error);
                console.log('Api call error - getting orders');
            })

            // get total likes
            axios.get(`${BASE_URL}orders/totalLikes/${friendUserId}`)
            .then((res) => {
                setDripScore(res.data.totalLikes)
            })
            .catch((error) => {
                console.log(error)
            })

        }, [])
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ProfileHeader
                showSettingsIcon={false}
            />
            <ScrollView>
                <ProfileInformation
                    numberOfOrders={myOrders.length}
                    dripScore={dripScore}
                    userName={friendName}
                    handleGoToSettings={handleGoToSettings}
                />
                <OrdersFilter
                    activeTab={activeTab}
                    profileId={friendUserId}
                    handleChangeToOrdersTab={handleChangeToOrdersTab}
                    handleChangeToLikedTab={handleChangeToLikedTab}
                />
                <OrdersGrid
                    orders={activeTab === 0 ? myOrders : likedOrders}
                    handleGoToOrdersFeed={handleGoToOrdersFeed}
                />
            </ScrollView>
        </SafeAreaView>
    )
};

export default ProfileMain;