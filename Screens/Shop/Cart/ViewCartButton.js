import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Icon } from 'react-native-elements';

import { useSelector } from 'react-redux';
import { selectCartValue, selectCartSize, selectCartItems } from '../../../Redux/cartSlice';

const { width } = Dimensions.get("window");

const ViewCartButton = ({ navigation }) => {

    const cartValue = useSelector(selectCartValue);
    const cartSize = useSelector(selectCartSize);

    return (
        <TouchableOpacity
            style={styles.viewCart}
            onPress={() => navigation.navigate('Cart Main')}
        >
            <View style={styles.cartIcon}>
                <Icon name="shopping-cart" type="font-awesome-5" color="white" size={18} />
                <View style={styles.cartNumItemsContainer}>
                    <Text style={styles.cartNumItems}>{cartSize}</Text>
                </View>
            </View>
            <Text style={styles.viewCartText}>View Cart</Text>
            <Text style={styles.viewCartText}>{`$${cartValue.toFixed(2)}`}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewCart: {
        backgroundColor: "black",
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12.5,
        paddingHorizontal: 25,
        width: "75%",
        left: (width - width * 0.75) / 2,
        position: "absolute",
        bottom: 15
    },
    viewCartText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
        marginLeft: 10
    },
    cartNumItems: {
        color: "black",
        fontWeight: "bold",
        fontSize: 12
    },
    cartIcon: {
        flexDirection: "row"
    },
    cartNumItemsContainer: {
        backgroundColor: "white",
        height: 16,
        width: 16,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -5,
        marginLeft: -6
    }
});

export default ViewCartButton;