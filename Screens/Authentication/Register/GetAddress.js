import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const GetAddress = ({ navigation }) => {

    const goToSearchAddress = () => {
        navigation.navigate('Search Address');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Enter a preferred shipping address</Text>
            <TouchableOpacity
                onPress={goToSearchAddress}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Add Address</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 40
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#005591",
        marginBottom: 20
    },
    button: {
        width: "100%",
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#005591",
        borderRadius: 7.5,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 7
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"
    }
})

export default GetAddress