import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from 'react-native-elements'

import HomeNavigator from './HomeNavigator';
import FriendsNavigator from './FriendsNavigator';
import OrdersNavigator from './OrdersNavigator';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator();

const Main = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                keyboardHidesTabBar: true,
                activeTintColor: "blue"
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                      <Icon name="home" type="font-awesome-5" color={color} size={24} />
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
}

export default Main;