import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const Login = ({ handleLogin, switchPage }) => {
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginButtonPress = () => {
        setEmailFocus(false);
        setPasswordFocus(false);
        handleLogin(email, password)
    }

    return (
        <View style={styles.formContainer}>
            <Text style={styles.loginHeader}>Welcome Back</Text>
            <View style={styles.loginForm}>
                <TextInput
                    style={[styles.textInput, emailFocus && styles.focusInputStyle]}
                    name="email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder="Email"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    blurOnSubmit={false}
                    autoCapitalize='none'
                />
                <TextInput
                    style={[styles.textInput, passwordFocus && styles.focusInputStyle]}
                    name="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder="Password"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    blurOnSubmit={false}
                    autoCapitalize='none'
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={[styles.buttonContainer, email === "" || password === "" ? styles.disabledLoginButton : styles.loginButton]}
                    onPress={handleLoginButtonPress}
                    disabled={email === "" || password === ""}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
            </View>
            <Text
                style={styles.switchToRegister}
                onPress={() => switchPage()}
            >
                Don't have an account? Sign up
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        width: "100%",
        height: "60%",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "white",
    },
    loginHeader: {
        fontSize: 32,
        color: "#005591",
        fontWeight: "bold"
    },
    loginForm: {
        width: "80%"
    },
    textInput: {
        marginVertical: 10,
        height: 45,
        backgroundColor: "white",
        borderRadius: 7.5,
        borderColor: "white",
        borderWidth: 2,
        width: "100%",
        paddingHorizontal: 20,
        fontSize: 14,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 7
    },
    focusInputStyle: {
        borderColor: "#005591",
        backgroundColor: "white",
        borderWidth: 2
    },
    buttonContainer: {
        height: 45,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 7.5,
        marginTop: 30,
        backgroundColor: "#005591",
    },
    loginButton: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 7
    },
    disabledLoginButton: {
        backgroundColor: "#858585",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
    switchToRegister: {
        fontSize: 15
    }
})

export default Login;