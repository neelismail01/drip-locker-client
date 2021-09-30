import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements'

// Logged In
import AuthenticationNavigator from './AuthenticationNavigator';
import HomeNavigator from './HomeNavigator';
import FriendsNavigator from './FriendsNavigator';
import OrdersNavigator from './OrdersNavigator';
import ProfileNavigator from './ProfileNavigator';

// Not Logged In
import Login from '../Screens/Authentication/Login';
import Register from '../Screens/Authentication/Register';

import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../Redux/userSlice';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Main = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn);

    if (isLoggedIn) {
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
    } else {
        return <AuthenticationNavigator />
    }
}

export default Main;