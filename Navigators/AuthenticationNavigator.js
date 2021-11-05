import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthenticationMain from '../Screens/Authentication/Landing/AuthenticationMain';
import LoginForm from '../Screens/Authentication/Login/LoginForm';
import RegisterForm from '../Screens/Authentication/Register/RegisterForm';

const Stack = createNativeStackNavigator();

const AuthenticationNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Authentication Main"
                component={AuthenticationMain}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Login Form"
                component={LoginForm}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Register Form"
                component={RegisterForm}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthenticationNavigator;