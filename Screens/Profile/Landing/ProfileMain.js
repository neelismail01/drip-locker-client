import React, { useState, useCallback } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { BASE_URL } from "@env";

import { useSelector } from "react-redux";
import { selectUserInfo } from '../../../Redux/userSlice';

import ProfileHeader from './ProfileHeader';
import OrdersGrid from './OrdersGrid';

const ProfileMain = ({ navigation }) => {
    const [myOrders, setMyOrders] = useState([]);
    const [likedOrders, setLikedOrders] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [dripScore, setDripScore] = useState();
    const userInfo = useSelector(selectUserInfo);

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
            axios.get(`${BASE_URL}orders/${userInfo.id}`)
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
            axios.get(`${BASE_URL}orders/liked/${userInfo.id}`)
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
            axios.get(`${BASE_URL}orders/${userInfo.id}`)
            .then((res) => {
                setMyOrders(res.data);
            })
            .catch((error) => {
                console.log(error);
                console.log('Api call error - getting orders');
            })

            // get total likes
            axios.get(`${BASE_URL}orders/totalLikes/${userInfo.id}`)
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
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Profile</Text>
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        onPress={handleGoToSettings}
                        style={styles.icon}
                    >
                        <Icon name="cog" type="font-awesome-5" color="black" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <ProfileHeader
                    numberOfOrders={myOrders.length}
                    dripScore={dripScore}
                    userName={userInfo.name}
                    handleGoToSettings={handleGoToSettings}
                />
                <View style={styles.tabsRow}>
                    <TouchableOpacity
                        style={[styles.tabContainer, activeTab === 0 && styles.activeTab]}
                        onPress={handleChangeToOrdersTab}
                    >
                        <Icon name="receipt" type="font-awesome-5" color="black" size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabContainer, activeTab === 1 && styles.activeTab]}
                        onPress={handleChangeToLikedTab}
                    >
                        <Icon name="favorite" type="material" color="black" size={20} />
                    </TouchableOpacity>
                </View>
                <OrdersGrid
                    orders={activeTab === 0 ? myOrders : likedOrders}
                    handleGoToOrdersFeed={handleGoToOrdersFeed}
                />
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 10
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
    },
    iconContainer: {
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    icon: {
        marginLeft: 20
    },
    tabsRow: {
        width: "100%",
        flexDirection: "row"
    },
    tabContainer: { 
        width: "50%",
        paddingVertical: 10,
        alignItems: "center",
    },
    activeTab: {
        borderBottomWidth: 1,
        borderBottomColor: "grey"
    }
});

export default ProfileMain;