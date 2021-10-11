import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FriendsMain from '../Screens/Friends/Feed/FriendsMain';
import FriendProfileMain from '../Screens/Friends/FriendProfile/ProfileMain';

const Stack = createNativeStackNavigator();

const FriendsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Friends Main"
                component={FriendsMain}
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
        </Stack.Navigator>
    )
}

export default FriendsNavigator;