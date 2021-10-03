import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../Redux/userSlice';

const LoginForm = ({ navigation }) => {
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleLoginButtonPress = () => {
        setEmailFocus(false);
        setPasswordFocus(false);
        handleLogin(email, password)
    }

    const handleLogin = async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}users/login`, { email, password })
            dispatch(setUserInfo(response.data.userInfo));
        } catch (err) {
            console.log('An error occurred while logging in. Please try again.');
        }
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
                    style={styles.buttonContainer}
                    onPress={handleLoginButtonPress}
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
        color: "#005591",
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