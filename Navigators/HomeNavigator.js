import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeMain from '../Screens/Home/HomeMain'

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home Main"
                component={HomeMain}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default HomeNavigator;