import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const ConfirmRegistration = ({ handleRegister }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Account Is Ready</Text>
            <TouchableOpacity
                onPress={() => handleRegister()}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Create Account</Text>
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
        padding: 40
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#005591",
        marginBottom: 30
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

export default ConfirmRegistration