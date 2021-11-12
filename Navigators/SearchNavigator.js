import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchMain from '../Screens/Search/Landing/SearchMain';
import ProfileMain from '../components/Profile/ProfileMain';
import ProfileFeedMain from '../components/ProfileFeed/ProfileFeedMain';

const Stack = createNativeStackNavigator();

const SearchNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen
                    name="Search Main"
                    component={SearchMain}
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
                    name="Profile Feed Main"
                    component={ProfileFeedMain}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default SearchNavigator;