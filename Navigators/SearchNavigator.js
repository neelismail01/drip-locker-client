import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchMain from '../Screens/Search/Landing/SearchMain';
import ProfileMain from '../components/Profile/ProfileMain';
import OrdersFeedMain from '../Screens/Search/OrdersFeed/OrdersFeedMain';

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
                    name="Orders Feed Main"
                    component={OrdersFeedMain}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default SearchNavigator;