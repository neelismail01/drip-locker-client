import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const RegisterFormPart3 = ({ handleConfirmRegister }) => {

    return (
        <View style={styles.confirmContainer}>
            <Text style={styles.registerHeader}>We're all set!</Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => handleConfirmRegister()}>
                <Text style={styles.buttonText}>Create My Account</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    confirmContainer: {
        width: "100%",
        height: "60%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    registerHeader: {
        fontSize: 32,
        color: "#005591",
        fontWeight: "bold"
    },
    buttonContainer: {
        height: 45,
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 7.5,
        marginTop: 30,
        backgroundColor: "#005591",
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 7
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    }
})

export default RegisterFormPart3;