import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const AuthenticationMain = ({ navigation }) => {

    return (
        <View style={styles.authenticationLandingContainer}>
            <Text style={styles.header}>Welcome To Drip</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.registerButton]}
                    onPress={() => navigation.navigate('Register Form')}
                >
                    <Text style={[styles.buttonText, styles.registerText]}>Create An Account</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.loginButton]}
                    onPress={() => navigation.navigate('Login Form')}
                >
                    <Text style={[styles.buttonText, styles.loginText]}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    authenticationLandingContainer: {
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "100%",
        backgroundColor: "white",
        padding: 40
    },
    header: {
        color: "#005591",
        fontWeight: "bold",
        fontSize: 32
    },
    buttonsContainer: {
        width: "100%"
    },
    button: {
        paddingVertical: 20,
        width: "100%",
        alignItems: "center",
        borderRadius: 7.5,
        marginVertical: 5,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 7
    },
    registerButton: {
        backgroundColor: "#005591",
    },
    loginButton: {
        borderColor: "#005591",
        borderWidth: 1
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 16
    },
    registerText: {
        color: "white",
    },
    loginText: {
        color: "#005591",
    }
})

  export default AuthenticationMain;