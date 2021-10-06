import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShopMain from '../Screens/Shop/Landing/ShopMain';
import BrandMain from '../Screens/Shop/Brand/BrandMain';

const Stack = createNativeStackNavigator();

const ShopNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Shop Main"
                component={ShopMain}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Brand Main"
                component={BrandMain}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default ShopNavigator;