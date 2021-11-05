import React, { useState, useCallback } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { AWS_BASE_URL } from "@env";

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
    const [dripScore, setDripScore] = useState(0);

    const userInfo = useSelector(selectUserInfo);
    const accessToken = userInfo.accessToken;
    const userId = route.params ? route.params.userId : userInfo.id;
    const userName = route.params ? route.params.userName : userInfo.name;

    const handleGoToSettings = () => {
        navigation.navigate('Settings Main');
    }

    const handleGoToOrdersFeed = (order) => {
        const orders = (activeTab === 0 ? myOrders : likedOrders);
        navigation.push('Orders Feed Main', { orders, order });
    }

    const handleChangeToOrdersTab = () => {
        if (activeTab !== 0) {
            setActiveTab(0);
        }
    }

    const handleChangeToLikedTab = () => {
        if (activeTab !== 1) {
            setActiveTab(1)
            axios.get(`${AWS_BASE_URL}orders/liked/${userId}`, { headers: { 'authorization': `Bearer ${accessToken}` } })
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
            const getDripScore = async () => {
                try {
                    const response = await axios.get(`${AWS_BASE_URL}users/${userId}/drip-score`, { headers: { 'authorization': `Bearer ${accessToken}` } })
                    if (response.data.status === 200) {
                        setDripScore(response.data.body)
                    }
                } catch (err) {
                    console.log(err);
                    console.log('Api call error - getting drip score');
                }
            }

            // get orders
            const getOrders = async () => {
                try {
                    const response = await axios.get(`${AWS_BASE_URL}orders/user/${userId}`, { headers: { 'authorization': `Bearer ${accessToken}` } })
                    if (response.data.status === 200) {
                        setMyOrders(response.data.body)
                    }
                } catch (err) {
                    console.log(err);
                    console.log('Api call error - getting orders');
                }
            }

            getDripScore();
            getOrders();

            return () => {
                setMyOrders([])
            }

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