import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const AuthenticationMain = ({ navigation }) => {

    return (
        <View style={styles.authenticationLandingContainer}>
            <View style={styles.subContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerIntro}>Welcome To</Text>
                    <Text style={styles.header}>Drip Locker</Text>
                    <Text style={styles.subHeader}>The place to share your coolest purchases and get inspired by what your friends are buying.</Text>
                </View>
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
        </View>
    )
}

const styles = StyleSheet.create({
    authenticationLandingContainer: {
        justifyContent: "center",
        height: "100%",
        backgroundColor: "white",
        padding: 30
    },
    subContainer: {
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "66%",
    },
    headerContainer: {
        width: "100%"
    },
    headerIntro: {
        color: "grey",
        fontWeight: "bold",
        fontSize: 26,
    },
    header: {
        color: "black",
        fontWeight: "bold",
        fontSize: 40,
    },
    subHeader: {
        color: "grey",
        marginTop: 15,
        fontSize: 16,
    },
    buttonsContainer: {
        width: "100%"
    },
    button: {
        paddingVertical: 15,
        width: "100%",
        alignItems: "center",
        borderRadius: 7.5,
        marginVertical: 5,
    },
    registerButton: {
        backgroundColor: "black"
    },
    loginButton: {
        borderColor: "black",
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
        color: "black",
    }
})

  export default AuthenticationMain;