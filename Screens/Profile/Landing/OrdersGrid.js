import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, Text } from "react-native";
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const OrdersGrid = ({ orders, handleGoToOrdersFeed }) => {

    return (
        <View style={styles.ordersContainer}>
            {
                orders.map(order => {
                    return (
                        <TouchableOpacity
                            style={styles.orderCard}
                            key={order.id}
                            onPress={() => handleGoToOrdersFeed(order)}
                        >
                            <Image
                                source={{ uri: order.business.coverImage }}
                                style={styles.orderCardImage}
                            />
                            <BlurView intensity={100} style={styles.orderInformation}>
                                <Text style={styles.businessName}>{order.business.name}</Text>
                            </BlurView>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
};

const styles = StyleSheet.create({
    ordersContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        paddingBottom: 20
    },
    orderCard: {
        width: width * 0.33,
        height: width * 0.4,
        justifyContent: "center",
    },
    orderCardImage: {
        width: "100%",
        height: "100%",
        borderWidth: 2,
        borderColor: "white"
    },
    orderInformation: {
        position: "absolute",
        bottom: 0,
        width: width * 0.33,
        borderRadius: 5,
        padding: 5,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: "white"
    },
    businessName: {
        fontWeight: "bold",
        fontSize: 12
    },
    orderSize: {
        fontSize: 12
    }
});

export default OrdersGrid;