import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from 'react-native-elements'

import AuthenticationNavigator from './AuthenticationNavigator';
import ShopNavigator from './ShopNavigator';
import FriendsNavigator from './FriendsNavigator';
import OrdersNavigator from './OrdersNavigator';
import ProfileNavigator from './ProfileNavigator';

import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../Redux/userSlice';

const Tab = createBottomTabNavigator();

const Main = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn);

    if (isLoggedIn) {
        return (
            <Tab.Navigator
                initialRouteName="Shop"
                screenOptions={{
                    keyboardHidesTabBar: true,
                    activeTintColor: "#005591"
                }}
            >
                <Tab.Screen
                    name="Shop"
                    component={ShopNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                          <Icon name="shopping-bag" type="font-awesome-5" color={color} size={24} />
                        )
                    }}
                />
                <Tab.Screen
                    name="Friends"
                    component={FriendsNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                          <Icon name="users" type="font-awesome-5" color={color} size={24} />
                        )
                    }}
                />
                <Tab.Screen
                    name="Orders"
                    component={OrdersNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                          <Icon name="receipt" type="font-awesome-5" color={color} size={24} />
                        )
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                          <Icon name="user-circle" type="font-awesome-5" color={color} size={24} />
                        )
                    }}
                />
            </Tab.Navigator>
        )
    } else {
        return <AuthenticationNavigator />
    }
}

export default Main;