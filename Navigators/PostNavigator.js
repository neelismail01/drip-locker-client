import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PurchaseCamera from '../Screens/Post/TakePictures/PurchaseCamera';
import PictureCarousel from '../Screens/Post/ViewPictures/PictureCarousel'
import PurchaseDetails from '../Screens/Post/AddDetails/PurchaseDetails';
import BrandSearch from '../Screens/Post/AddBrandDetails/BrandSearch';
import ProductTagging from '../Screens/Post/AddProductTags/ProductTagging';
import Caption from '../Screens/Post/AddCaption/Caption';

const Stack = createNativeStackNavigator();

const PostNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Purchase Camera"
                component={PurchaseCamera}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Picture Carousel"
                component={PictureCarousel}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Purchase Details"
                component={PurchaseDetails}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Brand Search"
                component={BrandSearch}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Product Tagging"
                component={ProductTagging}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Caption"
                component={Caption}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default PostNavigator;