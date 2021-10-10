import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

const CartItem = ({ item, handleUpdateItemQuantity, handleRemoveItemFromCart }) => {

    const { image, name, price } = item.product;

    const handleIncreaseQuantityButtonPress = () => {
        item.quantity += 1
        handleUpdateItemQuantity(item)
    }

    const handleDecreaseQuantityButtonPress = () => {
        item.quantity -= 1
        handleUpdateItemQuantity(item)
    }

    const handleRemoveItemButtonPress = () => {
        handleRemoveItemFromCart(item)
    }

    return (
        <View style={styles.cartItemContainer}>
            <Image
                style={styles.image}
                source={{
                    uri: image ? image : null
                }}
            />
            <View style={styles.itemDetailsContainer}>
                <View style={styles.itemDetailsRow}>
                    <Text style={styles.itemName}>
                        {name.length > 40 ? `${name.substr(0, 40)}...` : name}
                    </Text>
                    <Text>${(price * item.quantity).toFixed(2)}</Text>
                </View>
                <View style={styles.itemDetailsRow}>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            disabled={item.quantity === 1}
                            onPress={handleDecreaseQuantityButtonPress}
                        >
                            <Icon name="minus" type="font-awesome-5" color={item.quantity === 1 ? "#bfbfbf" : "black"} size={12} />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={handleIncreaseQuantityButtonPress}
                        >
                            <Icon name="plus" type="font-awesome-5" color="black" size={12} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Icon
                            name="trash-alt"
                            type="font-awesome-5"
                            color="red"
                            size={18}
                            onPress={handleRemoveItemButtonPress}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    cartItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginVertical: 15
    },
    image: {
        height: 100,
        width: "30%",
        borderRadius: 5
    },
    itemDetailsContainer: {
        width: "66%",
        justifyContent: "space-between",
    },
    itemDetailsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
    itemName: {
        fontSize: 13,
        fontWeight: "bold"
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantityButton: {
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#bfbfbf"
    },
    quantityText: {
        fontSize: 16,
        paddingHorizontal: 15
    }
});

export default CartItem;