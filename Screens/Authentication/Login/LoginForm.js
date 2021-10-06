import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

import { BASE_URL } from "@env";

import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../Redux/userSlice';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${BASE_URL}users/login`, { email, password })
            dispatch(setUserInfo(response.data.userInfo));
        } catch (err) {
            console.log(err);
            console.log('An error occurred while logging in. Please try again.');
        }
    }

    return (
        <View style={styles.formContainer}>
            <Text style={styles.loginHeader}>Welcome Back</Text>
            <View style={styles.loginForm}>
                <TextInput
                    style={styles.textInput}
                    name="email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder="Email"
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.textInput}
                    name="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder="Password"
                    autoCapitalize='none'
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={handleLogin}
                    disabled={email === "" || password === ""}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: 40
    },
    loginHeader: {
        fontSize: 36,
        color: "black",
        fontWeight: "bold",
    },
    loginForm: {
        width: "100%",
        marginVertical: 30,
    },
    textInput: {
        marginVertical: 10,
        height: 45,
        backgroundColor: "white",
        borderRadius: 7.5,
        borderColor: "grey",
        borderWidth: 1,
        width: "100%",
        paddingHorizontal: 20,
        fontSize: 14
    },
    focusInputStyle: {
        borderColor: "black",
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
        backgroundColor: "black",
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 7
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    }
})

export default LoginForm;