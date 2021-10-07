import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ProductCard = ({ product, goToProductPage }) => {

    const { name, image, price, countInStock } = product;

    return (
        <TouchableOpacity
            style={styles.productContainer}
            onPress={() => goToProductPage(product)}
        >
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{
                        uri: image ? image : null
                    }}
                />
            </View>
            <View style={{ marginVertical: 10 }}>
                <Text style={styles.title}>{name.length > 20 ? `${name.substr(0, 20)}...` : name}</Text>
                <Text style={styles.subText}>${price}</Text>
            </View>
            {
                countInStock === 0 &&
                <Text style={styles.outOfStock}>Out Of Stock</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    productContainer: {
        width: 0.4 * width,
        justifyContent: "center",
        marginVertical: 10
    },
    imageContainer: {
        borderWidth: 0.25,
        borderColor: "grey",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 5,
    },
    title: {
        fontSize: 12
    },
    subText: {
        color: "grey",
        fontSize: 12,
        marginTop: 5
    },
    outOfStock: {
        color: "red",
        fontSize: 14,
        fontWeight: "bold",
        marginVertical: 10
    }
})

export default ProductCard;