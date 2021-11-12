import React, { useState, useCallback } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { AWS_BASE_URL } from "@env";

import { useSelector } from "react-redux";
import { selectUserInfo } from '../../Redux/userSlice';

import ProfileHeader from './ProfileHeader';
import ProfileInformation from './ProfileInformation';
import OrdersFilter from './OrdersFilter';
import ProfileContent from './ProfileContent';

const ProfileMain = ({ navigation, route }) => {
    const [myOrders, setMyOrders] = useState([]);
    const [likedOrders, setLikedOrders] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [dripScore, setDripScore] = useState(null);
    const [numberOfOrders, setNumberOfOrders] = useState(null)

    const userInfo = useSelector(selectUserInfo);
    const accessToken = userInfo.accessToken;
    const userId = route.params ? route.params.userId : userInfo.id;
    const userName = route.params ? route.params.userName : userInfo.name;

    console.log(userId)

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
            setActiveTab(1);
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
                }
            }

            axios.get(`${AWS_BASE_URL}orders/user/${userId}/liked`, config)
            .then((response) => {
                if (response.data.statusCode === 200) {
                    setLikedOrders(response.data.body);
                }
            })
            .catch((error) => {
                console.log(error);
                console.log('Api call error - getting liked orders');
            })
        }
    }

    useFocusEffect(
        useCallback(() => {
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
                }
            }

            axios.get(`${AWS_BASE_URL}orders/user/${userId}`, config)
            .then(response => {
                if (response.data.statusCode === 200) {
                    setMyOrders(response.data.body);
                    setNumberOfOrders(response.data.body.length);
                }
            })
            .catch(err => {
                console.log(err);
                console.log('Api call error - getting orders');
            })

            return () => {
                setMyOrders([])
            }
        }, [])
    )

    useFocusEffect(
        useCallback(() =>{
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
                }
            }

            axios.get(`${AWS_BASE_URL}users/${userId}/drip-score`, config)
            .then(response => {
                if (response.data.statusCode === 200) {
                    setDripScore(response.data.body)
                }
            })
            .catch(err => {
                console.log(err);
                console.log('Api call error - getting drip score');
            })

            return () => {
                setDripScore(null)
            }
        }, [])
    )


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ProfileHeader
                handleGoToSettings={handleGoToSettings}
                showSettingsIcon={userInfo.id === userId}
                userInfo={userInfo}
                userId={userId}
            />
            <ScrollView>
                <ProfileInformation
                    numberOfOrders={numberOfOrders}
                    dripScore={dripScore}
                    userName={userName}
                    handleGoToSettings={handleGoToSettings}
                />
                <OrdersFilter
                    activeTab={activeTab}
                    profileId={userId}
                    showLikedTab={userInfo.id === userId}
                    handleChangeToOrdersTab={handleChangeToOrdersTab}
                    handleChangeToLikedTab={handleChangeToLikedTab}
                />
                <ProfileContent
                    loggedInUserProfile={userInfo.id === userId}
                    myOrdersTab={activeTab === 0}
                    orders={activeTab === 0 ? myOrders : likedOrders}
                    handleGoToOrdersFeed={handleGoToOrdersFeed}
                />
            </ScrollView>
        </SafeAreaView>
    )
};

export default ProfileMain;