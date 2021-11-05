import React, { useEffect } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthenticationNavigator from './AuthenticationNavigator';
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
                initialRouteName="Home"
                screenOptions={{
                    keyboardHidesTabBar: true,
                    tabBarActiveTintColor: "black",
                    tabBarShowLabel: false
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
                                size={28}
                            />
                        ),
                        labelStyle: [{  }],
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Search"
                    component={ProfileNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon
                                name={'search'}
                                type={'material'}
                                color={color}
                                size={28}
                            />
                        ),
                        labelStyle: [{  }],
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Post"
                    component={FriendsNavigator}
                    options={{
                        tabBarIcon: () => (
                            <View style={styles.postButton }>
                                <Icon
                                    name="add"
                                    type="material"
                                    color={'white'}
                                    size={24}
                                />
                            </View>
                        ),
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Trending"
                    component={ProfileNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                          <Icon
                            name="trending-up"
                            type="material"
                            color={color}
                            size={28}
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
                            size={28}
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
    postButton: {
        height: 30,
        width: 40,
        borderRadius: 5,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 7
    }
})

export default Main;