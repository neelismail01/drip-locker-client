import React, { useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Dimensions } from "react-native";
import AppLoading from 'expo-app-loading';
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

import { AWS_BASE_URL } from "../util/common";

import AuthenticationNavigator from './AuthenticationNavigator';
import FriendsNavigator from './FriendsNavigator';
import SearchNavigator from './SearchNavigator';
import PostNavigator from './PostNavigator';
import TrendingNavigator from './TrendingNavigator';
import ProfileNavigator from './ProfileNavigator';

import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, setAccessToken, setUserInfo } from '../Redux/userSlice';

const Tab = createBottomTabNavigator();
const { height, width } = Dimensions.get('window')

const Main = () => {

    const [isLoading, setIsLoading] = useState(true)
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();


    const checkForUserToken = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('access_token');
            if (accessToken !== null) {

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                };

                const response = await axios.get(`${AWS_BASE_URL}users/info`, config)
                dispatch(setAccessToken(accessToken));
                dispatch(setUserInfo(response.data.body));
            }
        } catch (err) {
            console.log(err);
        }
    }

    if (isLoading) {
        return (
            <AppLoading
                startAsync={checkForUserToken}
                onFinish={() => setIsLoading(false)}
                onError={console.warn}
            />
        )
    } else if (isLoggedIn) {
        return (
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    keyboardHidesTabBar: true,
                    tabBarActiveTintColor: "black",
                    tabBarShowLabel: false,
                    tabBarStyle: { height: 80 }
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={FriendsNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon
                                name={'home'}
                                type={'material'}
                                color={color}
                                size={24}
                            />
                        ),
                        labelStyle: [{  }],
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Search"
                    component={SearchNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon
                                name={'search'}
                                type={'material'}
                                color={color}
                                size={24}
                            />
                        ),
                        labelStyle: [{  }],
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Post"
                    component={PostNavigator}
                    options={{
                        tabBarIcon: () => (
                            <View style={styles.postButton }>
                                <Icon
                                    name="add"
                                    type="material"
                                    color={'black'}
                                    size={28}
                                />
                            </View>
                        ),
                        tabBarLabel: () => null,
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Trending"
                    component={TrendingNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                          <Icon
                            name="trending-up"
                            type="material"
                            color={color}
                            size={24}
                        />
                        ),
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                          <Icon
                            name="person"
                            type="material"
                            color={color}
                            size={24}
                        />
                        ),
                        headerShown: false
                    }}
                />
            </Tab.Navigator>
        )
    } else {
        return <AuthenticationNavigator />
    }
}

const styles = StyleSheet.create({
    loadingSpinnerContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: height,
        width: width
    },
    loginSpinnerText: {
        marginTop: 10
    },
    postButton: {
        height: 35,
        width: 35,
        borderRadius: 17.5,
        borderWidth: 1,
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 7
    }
})

export default Main;