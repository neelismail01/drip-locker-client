import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthenticationMain from '../Screens/Authentication/AuthenticationMain';

const Stack = createNativeStackNavigator();

const AuthenticationNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AuthenticationMain"
                component={AuthenticationMain}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthenticationNavigator;