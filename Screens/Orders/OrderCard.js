import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native';

var { width } = Dimensions.get("window");

const OrderCard = ({ order, ordersCount }) => {

    const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
    const date = order.dateOrdered.toString().substring(0, order.dateOrdered.toString().indexOf('T'));
    let dateParts = date.split('-');
    dateParts = dateParts.map(datePart => {
        return parseInt(datePart - 1);
    })
    const formattedDate = `${monthNames[dateParts[1]]} ${dateParts[2]}, ${dateParts[0]}`;

    return (
        <TouchableOpacity
            style={styles.orderContainer}
            onPress={() => props.navigation.navigate('Receipt', { order, ordersCount })}
        >
            <Image
                style={styles.coverImage}
                source={{ uri: order.business.coverImage }}
            />
            <View style={styles.orderInfo}>
                <Text style={styles.header}>
                    {order.business.name.length < 30 ? order.business.name : order.business.name.substring(0, 14) + '...'}
                </Text>
                <View style={styles.itemCountAndPrice}>
                    <Text style={styles.subText}>{order.totalQuantity} {order.totalQuantity === 1 ? 'Item' : 'Items'} • ${order.totalPrice}</Text>
                </View>
                <Text style={styles.subText}>Ordered on {formattedDate}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    orderContainer: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomColor: "grey",
        borderBottomWidth: 0.25
    },
    coverImage: {
        height: width * 0.25,
        width: "30%",
        resizeMode: "contain",
    },
    header: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5
    },
    orderInfo: {
        width: "70%",
        justifyContent: "center",
        paddingLeft: 20
    },
    itemCountAndPrice: {
        flexDirection: "row",
        width: "100%"
    },
    subText: {
        marginRight: 10,
        color: "grey",
        fontSize: 14
    }
})

export default OrderCard;