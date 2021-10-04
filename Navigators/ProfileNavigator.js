import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileMain from '../Screens/Profile/ProfileMain';
import PersonalInformation from '../Screens/Profile/PersonalInformation';
import Addresses from '../Screens/Profile/Addresses';
import SearchAddress from '../Screens/Profile/SearchAddress';

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
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name="Search Address"
                    component={SearchAddress}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default ProfileNavigator;