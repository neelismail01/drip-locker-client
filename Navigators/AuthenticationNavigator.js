import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthenticationMain from '../Screens/Authentication/Landing/AuthenticationMain';
import LoginForm from '../Screens/Authentication/Login/LoginForm';
import RegisterForm from '../Screens/Authentication/Register/RegisterForm';
import SearchAddress from '../Screens/Authentication/Register/SearchAddress';

const Stack = createNativeStackNavigator();

const AuthenticationNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Group>
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
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name="Search Address"
                    component={SearchAddress}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default AuthenticationNavigator;