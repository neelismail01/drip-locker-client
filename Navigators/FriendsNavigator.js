import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FriendFeedMain from '../Screens/Friends/Feed/FriendFeedMain';
import ProfileMain from '../components/Profile/ProfileMain';
import FeedMain from '../components/Feed/FeedMain';

const Stack = createNativeStackNavigator();

const FriendsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Friend Feed Main"
                component={FriendFeedMain}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Profile Main"
                component={ProfileMain}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Feed Main"
                component={FeedMain}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default FriendsNavigator;