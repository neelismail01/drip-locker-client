import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';

import { useDispatch } from 'react-redux';
import { addToCart } from '../../../Redux/cartSlice';

const ProductMain = ({ navigation, route }) => {
    const { description, image, name, price } = route.params.product;
    const dispatch = useDispatch();
    
    const addItemToCart = () => {
        dispatch(addToCart(route.params.product));
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <Image
                style={styles.image}
                source={{
                    uri: image ? image : null
                }}
            />
            <View style={styles.body}>
                <View>
                    <Text style={styles.productName}>{name}</Text>
                    <Text style={styles.productPrice}>${price}</Text>
                    <View style={styles.separator} />
                    <Text style={styles.descriptionHeader}>Description:</Text>
                    <Text style={styles.productDescription}>{description}</Text>
                </View>
                <TouchableOpacity
                    style={styles.purchaseButton}
                    onPress={addItemToCart}
                >
                    <Text style={styles.buttonText}>Add To Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "40%"
    },
    body: {
        justifyContent: "space-between",
        padding: 20,
        height: "60%"
    },
    productName: {
        fontWeight: "bold",
        fontSize: 18
    },
    productPrice: {
        fontSize: 16,
        marginVertical: 7.5
    },
    separator: {
        width: "100%",
        borderColor: "grey",
        borderWidth: 0.5,
        marginVertical: 10
    },
    descriptionHeader: {
        fontWeight: "bold",
        fontSize: 16,
        marginVertical: 7.5
    },
    productDescription: {
        marginVertical: 7.5,
        fontSize: 15,
        color: "grey"
    },
    purchaseButton: {
        backgroundColor: "black",
        width: "100%",
        paddingVertical: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold"
    }
})

export default ProductMain;