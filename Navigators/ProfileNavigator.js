import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileMain from '../Screens/Profile/ProfileMain';
import PersonalInformation from '../Screens/Profile/PersonalInformation';
import Addresses from '../Screens/Profile/Addresses';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile Main"
                component={ProfileMain}
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
            <Stack.Screen
                name="Addresses"
                component={Addresses}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default ProfileNavigator;