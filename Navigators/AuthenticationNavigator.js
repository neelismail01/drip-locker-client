import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../Screens/Authentication/Login';
import Register from '../Screens/Authentication/Register';

const Stack = createNativeStackNavigator();

const AuthenticationNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthenticationNavigator;