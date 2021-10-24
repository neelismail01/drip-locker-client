import React, { useState, useCallback } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { BASE_URL } from "@env";

import { useSelector } from "react-redux";
import { selectUserInfo } from '../../Redux/userSlice';

import ProfileHeader from './ProfileHeader';
import ProfileInformation from './ProfileInformation';
import OrdersGrid from './OrdersGrid';
import OrdersFilter from './OrdersFilter';

const ProfileMain = ({ navigation, route }) => {
    const [myOrders, setMyOrders] = useState([]);
    const [likedOrders, setLikedOrders] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [dripScore, setDripScore] = useState();

    const userInfo = useSelector(selectUserInfo);
    const userName = route.params ? route.params.userName : userInfo.name;
    const userId = route.params ? route.params.userId : userInfo.id;

    const handleGoToSettings = () => {
        navigation.navigate('Settings Main')
    }

    const handleGoToOrdersFeed = (order) => {
        const orders = (activeTab === 0 ? myOrders : likedOrders)
        navigation.push('Orders Feed Main', { orders, order })
    }

    const handleChangeToOrdersTab = () => {
        if (activeTab !== 0) {
            setActiveTab(0)
            axios.get(`${BASE_URL}orders/${userId}`)
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
            axios.get(`${BASE_URL}orders/liked/${userId}`)
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
            axios.get(`${BASE_URL}orders/${userId}`)
            .then((res) => {
                setMyOrders(res.data);
            })
            .catch((error) => {
                console.log(error);
                console.log('Api call error - getting orders');
            })

            // get total likes
            axios.get(`${BASE_URL}orders/totalLikes/${userId}`)
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
                handleGoToSettings={handleGoToSettings}
                showSettingsIcon={true}
            />
            <ScrollView>
                <ProfileInformation
                    numberOfOrders={myOrders.length}
                    dripScore={dripScore}
                    userName={userName}
                    handleGoToSettings={handleGoToSettings}
                />
                <OrdersFilter
                    activeTab={activeTab}
                    profileId={userId}
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