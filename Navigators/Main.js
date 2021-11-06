import React, { useEffect } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthenticationNavigator from './AuthenticationNavigator';
import FriendsNavigator from './FriendsNavigator';
import PostNavigator from './PostNavigator';
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
                    tabBarShowLabel: true
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
                    component={ProfileNavigator}
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
                    component={ProfileNavigator}
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