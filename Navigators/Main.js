import React, { useEffect } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthenticationNavigator from './AuthenticationNavigator';
import ShopNavigator from './ShopNavigator';
import FriendsNavigator from './FriendsNavigator';
import ProfileNavigator from './ProfileNavigator';

import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, setAccessToken } from '../Redux/userSlice';

const Tab = createBottomTabNavigator();

const Main = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkForUserToken = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('access_token');
                if (accessToken !== null) {
                    dispatch(setAccessToken(accessToken));
                }
            } catch (err) {
                console.log(err);
            }
        }
        checkForUserToken();
    }, [])

    if (isLoggedIn) {
        return (
            <Tab.Navigator
                initialRouteName="Friends"
                screenOptions={{
                    keyboardHidesTabBar: true,
                    tabBarActiveTintColor: "black",
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen
                    name="Shop"
                    component={ShopNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                          <Icon name="shopping-bag" type="font-awesome-5" color={color} size={24} />
                        ),
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Friends"
                    component={FriendsNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                          <Icon name="users" type="font-awesome-5" color={color} size={24} />
                        ),
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                          <Icon name="user-circle" type="font-awesome-5" color={color} size={24} />
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

export default Main;