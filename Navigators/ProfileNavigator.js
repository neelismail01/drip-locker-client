import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileMain from '../Screens/Profile/Landing/UserProfile';
import SettingsMain from '../Screens/Profile/Settings/SettingsMain';
import PersonalInformation from '../Screens/Profile/EditPersonalInformation/PersonalInformation';
import OrdersFeedMain from '../Screens/Profile/OrdersFeed/OrdersFeedMain';

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
                    name="Orders Feed Main"
                    component={OrdersFeedMain}
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
                <Stack.Screen
                    name="Personal Information"
                    component={PersonalInformation}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default ProfileNavigator;