import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileMain from '../components/Profile/ProfileMain';
import SettingsMain from '../Screens/Profile/Settings/SettingsMain';
import FeedMain from '../components/Feed/FeedMain';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Group>
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
                <Stack.Screen
                    name="Settings Main"
                    component={SettingsMain}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default ProfileNavigator;