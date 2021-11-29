import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchMain from '../Screens/Search/Landing/SearchMain';
import FullResults from '../Screens/Search/Results/FullResults';
import ProfileMain from '../components/Profile/ProfileMain';
import FeedMain from '../components/Feed/FeedMain';

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
                    name="Full Results"
                    component={FullResults}
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
                    name="Feed Main"
                    component={FeedMain}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default SearchNavigator;