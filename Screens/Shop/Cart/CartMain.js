import React from "react";
import { SafeAreaView, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";

import CartItem from './CartItem';

import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, updateItemQuantity, removeFromCart } from '../../../Redux/cartSlice';

const CartMain = ({ navigation }) => {

    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    
    const handleUpdateItemQuantity = (item) => {
        dispatch(updateItemQuantity(item));
    }

    const handleRemoveItemFromCart = (item) => {
        dispatch(removeFromCart(item))
    }

    const handleProceedToCheckoutButtonPress = () => {
        navigation.navigate('Checkout Main')
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white"}}>
            <ScrollView
                contentContainerStyle={styles.cartContainer}
            >
                <Text style={styles.cartHeader}>Cart</Text>
                {
                    cartItems.map(item => {
                        return (
                            <CartItem
                                key={item.product.id}
                                item={item}
                                handleUpdateItemQuantity={handleUpdateItemQuantity}
                                handleRemoveItemFromCart={handleRemoveItemFromCart}
                            />
                        )
                    })
                }
                <TouchableOpacity
                    style={styles.proceedToCheckoutButton}
                    onPress={handleProceedToCheckoutButtonPress}
                >
                    <Text style={styles.buttonText}>Continue To Checkout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    cartContainer: {
        padding: 20
    },
    cartHeader: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10
    },
    proceedToCheckoutButton: {
        backgroundColor: "black",
        width: "100%",
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 10
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    }
});

export default CartMain;