import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';

import { useDispatch } from 'react-redux';
import { addToCart } from '../../../Redux/cartSlice';

const ProductMain = ({ navigation, route }) => {
    const [quantity, setQuantity] = useState(1);

    const { description, image, name, price } = route.params.product;
    const dispatch = useDispatch();
    
    const addItemToCart = () => {
        dispatch(addToCart({
            product: route.params.product,
            quantity,
            dateAdded: Date.now()
        }));
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
                <View>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            disabled={quantity === 1}
                            onPress={() => setQuantity(quantity - 1)}
                        >
                            <Icon name="minus" type="font-awesome-5" color={quantity === 1 ? "#bfbfbf" : "black"} size={15} />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => setQuantity(quantity + 1)}
                        >
                            <Icon name="plus" type="font-awesome-5" color="black" size={15} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.addToCartButton}
                        onPress={addItemToCart}
                    >
                        <Text style={styles.buttonText}>Add To Cart</Text>
                    </TouchableOpacity>
                </View>
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
    quantityContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 25
    },
    quantityButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#bfbfbf"
    },
    quantityText: {
        fontSize: 16,
        paddingHorizontal: 15
    },
    addToCartButton: {
        backgroundColor: "black",
        width: "100%",
        paddingVertical: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    },
})

export default ProductMain;