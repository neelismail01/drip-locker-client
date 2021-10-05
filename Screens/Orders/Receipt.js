import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements'

const Receipt = ({ navigation, route }) => {
    const { order } = route.params;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = order.dateOrdered.toString().substring(0, order.dateOrdered.toString().indexOf('T'));
    let dateParts = date.split('-');
    dateParts = dateParts.map(datePart => { return parseInt(datePart - 1)})
    const formattedDate = `${monthNames[dateParts[1]]} ${dateParts[2]}, ${dateParts[0]}`;

    return (
        <ScrollView
            style={styles.receiptContainer}
            contentContainerStyle={styles.receiptContentContainer}
        >
            <Image
                style={styles.coverPhoto}
                source = {{ uri: order.business.coverImage }}
            />
            <View style={styles.orderDetailsContainer}>
                <View style={styles.businessNameContainer}>
                    <Text style={styles.businessNameText}>{order.business.name}</Text>
                    <View style={styles.subTextContainer}>
                        <Text style={styles.subText}>{order.status} • {formattedDate}</Text>
                    </View>
                </View>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Your Order Details</Text>
                        {
                            order.rated ?
                            <TouchableOpacity style={styles.rateContainer}>
                                <Text style={styles.rateText}>Rate order</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.rateContainer}>
                                <Text style={styles.rateText}>Rate order</Text>
                            </TouchableOpacity>
                        }
                </View>
                {
                    order.orderItems.map(item => {
                        return (
                            <View key={item._id} style={styles.itemContainer}>
                                <View style={styles.quantity}>
                                    <Text style={styles.quantityText}>{item.quantity}</Text>
                                </View>
                                <Text style={styles.itemText}>{item.product.name}</Text>
                            </View>
                        )
                    })
                }
                <View style={styles.priceContainer}>
                    <Icon name="receipt" type="font-awesome-5" color="black" size={27.5} />
                    <Text style={styles.priceText}>Total: ${order.totalPrice}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    receiptContainer: {
        backgroundColor: "white",
        flex: 1
    },
    receiptContentContainer: {
        width: "100%",
        height: "100%"
    },
    coverPhoto: {
        width: "100%",
        height: "20%"
    },
    orderDetailsContainer: {
        paddingHorizontal: 20
    },
    businessNameContainer: {
        paddingVertical: 10,
        justifyContent: "center",
        backgroundColor: "white",
    },
    businessNameText: {
        fontWeight: "bold",
        color: "#005591",
        fontSize: 30
    },
    subTextContainer: {
        flexDirection: "row",
        marginTop: 10
    },
    subText: {
        fontSize: 14
    },
    headerContainer: {
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
    },
    rateContainer: {
        backgroundColor: "#E8E8E8",
        padding: 10,
        borderRadius: 10
    },
    rateText: {
        fontSize: 12
    },
    itemContainer: {
        flexDirection: "row",
        marginVertical: 5,
        paddingVertical: 15,
        width: "100%",
        backgroundColor: "white",
        alignItems: "center",
    },
    quantity: {
        backgroundColor: "#E8E8E8",
        height: 26,
        width: 26,
        borderRadius: 2.5,
        alignItems: "center",
        justifyContent: "center",
        padding: 5
    },
    quantityText: {
        fontSize: 14,
        color: "black",
        fontWeight: "bold"
    },
    itemText: {
        fontSize: 16,
        marginLeft: 20
    },
    priceContainer: {
        backgroundColor: "white",
        marginTop: 2,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20,
        borderTopWidth: 0.25,
        borderTopColor: "grey"
    },
    priceIcon: {
        paddingHorizontal: 25
    },
    priceText: {
        marginLeft: 27.5,
        fontSize: 16
    }
})

export default Receipt