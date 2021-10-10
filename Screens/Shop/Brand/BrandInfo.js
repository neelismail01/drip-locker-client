import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

const BrandInfo = ({ businessDetails }) => {

    const { name, rating } = businessDetails

    return (
        <View style={styles.profileTextContainer}>
            <View style={styles.businessNameAndRating}>
                <Text style={styles.businessName}>{name}</Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>{rating}</Text>
                </View>
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
    }
})

export default BrandInfo;