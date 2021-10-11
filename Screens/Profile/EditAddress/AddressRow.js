import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const AddressRow = ({ address, handleChangePreferredAddress }) => {

    return (
        <TouchableOpacity
            style={styles.addressContainer}
            onPress={() => handleChangePreferredAddress(address)}
        >
            <View style={styles.addressText}>
                <Text style={styles.addressPrimaryText}>{address.addressPrimaryText}</Text>
                <Text style={styles.addressSecondaryText}>{address.addressSecondaryText}</Text>
                {
                    address.active && <Text style={styles.preferredText}>Preferred</Text>
                }
            </View>
            <View style={styles.selectedCircleOutline}>
                <View
                    style={address.active && styles.selectedCircle}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    addressContainer: {
        marginVertical: 15,
        height: 75,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    addressPrimaryText: {
        fontWeight: "bold",
        marginBottom: 10,
        fontSize: 16
    },
    addressSecondaryText: {
        fontSize: 16
    },
    preferredText: {
        color: "black",
        marginTop: 10,
        fontSize: 12
    },
    selectedCircleOutline: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        borderWidth: 1,
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center"
    },
    selectedCircle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "black"
    }
})

export default AddressRow;