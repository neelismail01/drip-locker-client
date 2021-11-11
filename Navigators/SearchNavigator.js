import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchMain from '../Screens/Search/Landing/SearchMain';

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
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default SearchNavigator;