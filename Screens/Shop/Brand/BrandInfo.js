import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

const BrandInfo = ({ businessDetails }) => {

    const { name, fullAddress, rating } = businessDetails

    return (
        <View style={styles.profileTextContainer}>
            <View style={styles.businessNameAndRating}>
                <Text style={styles.businessName}>{name}</Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>{rating}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 6 }}>
                <Text style={styles.businessDetails}>{fullAddress}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profileTextContainer: {
        flexDirection: "column",
        backgroundColor: 'white',
        width: "100%",
        borderRadius: 5,
        padding: 20
    },
    businessNameAndRating: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
    },
    businessName: {
        fontSize: 28,
        fontWeight: "bold",
    },
    ratingContainer: {
        backgroundColor: "#efefef",
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    ratingText: {
        fontWeight: "bold",
        fontSize: 12,
        color: "black"
    },
    businessDetails: {
        fontSize: 14,
        color: "grey"
    }
})

export default BrandInfo;