import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FeedMain from '../Screens/Friends/Feed/FeedMain';
import FriendProfileMain from '../Screens/Friends/FriendProfile/ProfileMain';
import FriendOrdersFeedMain from '../Screens/Friends/FriendOrdersFeed/FriendOrdersFeedMain';
import AddFriendMain from '../Screens/Friends/AddFriend/AddFriendMain';

const Stack = createNativeStackNavigator();

const FriendsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Feed Main"
                component={FeedMain}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Friend Profile Main"
                component={FriendProfileMain}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Friend Orders Feed Main"
                component={FriendOrdersFeedMain}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Add Friend Main"
                component={AddFriendMain}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default FriendsNavigator;