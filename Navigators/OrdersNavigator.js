import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrdersMain from '../Screens/Orders/OrdersMain'

const Stack = createNativeStackNavigator();

const OrdersNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Orders Main"
                component={OrdersMain}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default OrdersNavigator;