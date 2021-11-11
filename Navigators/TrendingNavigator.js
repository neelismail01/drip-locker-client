import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TrendingMain from '../Screens/Trending/Landing/TrendingMain';

const Stack = createNativeStackNavigator();

const TrendingNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen
                    name="Trending Main"
                    component={TrendingMain}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default TrendingNavigator;