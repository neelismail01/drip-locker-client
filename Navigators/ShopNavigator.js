import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShopMain from '../Screens/Shop/Landing/ShopMain';
import BrandMain from '../Screens/Shop/Brand/BrandMain';
import ProductMain from '../Screens/Shop/Product/ProductMain';
import CartMain from '../Screens/Shop/Cart/CartMain';
import CheckoutMain from '../Screens/Shop/Checkout/CheckoutMain';

const Stack = createNativeStackNavigator();

const ShopNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Group>
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
                <Stack.Screen
                    name="Cart Main"
                    component={CartMain}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Checkout Main"
                    component={CheckoutMain}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name="Product Main"
                    component={ProductMain}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default ShopNavigator;