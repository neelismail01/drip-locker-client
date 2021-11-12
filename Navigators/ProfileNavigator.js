import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileMain from '../components/Profile/ProfileMain';
import SettingsMain from '../Screens/Profile/Settings/SettingsMain';
import PersonalInformation from '../Screens/Profile/EditPersonalInformation/PersonalInformation';
import ProfileFeedMain from '../components/ProfileFeed/ProfileFeedMain';

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
                    name="Profile Feed Main"
                    component={ProfileFeedMain}
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