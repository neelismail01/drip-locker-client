import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PurchaseDetailsMain from '../Screens/Post/PurchaseDetails/PurchaseDetailsMain';

const Stack = createNativeStackNavigator();

const PostNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Purchase Details Main"
                component={PurchaseDetailsMain}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default PostNavigator;