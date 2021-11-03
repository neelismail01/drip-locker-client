import React from "react";
import { SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { BASE_URL } from '@env';

import CartItem from './CartItem';

import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo } from '../../../Redux/userSlice';
import { selectCartItems, selectCartValue, selectCartSize, updateItemQuantity, clearCart, removeFromCart } from '../../../Redux/cartSlice';

const CheckoutMain = ({ navigation }) => {

    const userInfo = useSelector(selectUserInfo);
    const activeAddress = userInfo.addresses.filter(address => address.active)[0];

    const cartItems = useSelector(selectCartItems);
    const cartValue = useSelector(selectCartValue);
    const cartSize = useSelector(selectCartSize);
    const dispatch = useDispatch();
    
    const handleUpdateItemQuantity = (item) => {
        dispatch(updateItemQuantity(item));
    }

    const handleRemoveItemFromCart = (item) => {
        dispatch(removeFromCart(item))
    }

    const handlePurchaseButtonPress = async () => {
        try {
            const order = {
                business: cartItems[0].product.business._id,
                orderItems: cartItems.map(item => {
                    return {
                        product: item.product.id,
                        quantity: item.quantity, 
                    }
                }),
                shippingAddress: activeAddress,
                totalPrice: cartValue,
                totalQuantity: cartSize,
                dateOrdered: Date.now(),
                likedBy: [],
                user: userInfo.id
            }
            await axios.post(`https://4r84cu44c4.execute-api.us-east-1.amazonaws.com/beta/orders`, order);
            navigation.navigate('Shop Main');
            dispatch(clearCart());
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView
                contentContainerStyle={styles.checkoutContainer}
            >
                <Text style={styles.checkoutHeader}>Checkout</Text>
                <Text style={styles.subHeader}>Delivery Address</Text>
                <TouchableOpacity
                    style={styles.addressButton}
                >
                    <View>
                        <Text style={styles.primaryAddress}>{activeAddress.addressPrimaryText}</Text>
                        <Text style={styles.secondaryAddress}>{activeAddress.addressSecondaryText}</Text>
                    </View>
                    <Icon name="angle-right" type="font-awesome-5" color="black" size={24} />
                </TouchableOpacity>
                <Text style={styles.subHeader}>Items</Text>
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
                    style={styles.purchaseButton}
                    onPress={handlePurchaseButtonPress}
                >
                    <Text style={styles.purchaseButtonText}>Purchase</Text>
                </TouchableOpacity>
            </ScrollView>            
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    checkoutContainer: {
        padding: 20
    },
    checkoutHeader: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10
    },
    subHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10
    },
    addressButton: {
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    primaryAddress: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5
    },
    secondaryAddress: {
        fontSize: 14
    },
    purchaseButton: {
        backgroundColor: "black",
        width: "100%",
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 10
    },
    purchaseButtonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    }
});

export default CheckoutMain;