import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const ConfirmRegistration = ({ handleRegister, error }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Account Is Ready</Text>
            <TouchableOpacity
                onPress={() => handleRegister()}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            {
                error.length > 0 &&
                <Text style={styles.errorMessage}>{error}</Text>
            }
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
        color: "black",
    },
    button: {
        width: "100%",
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: 7.5,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 7,
        marginVertical: 30
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"
    },
    errorMessage: {
        color: "red"
    }
})

export default ConfirmRegistration