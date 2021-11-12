import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FeedMain from '../Screens/Friends/Feed/FeedMain';
import ProfileMain from '../components/Profile/ProfileMain';
import OrdersFeedMain from '../Screens/Friends/OrdersFeed/OrdersFeedMain';

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
                name="Profile Main"
                component={ProfileMain}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Orders Feed Main"
                component={OrdersFeedMain}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default FriendsNavigator;