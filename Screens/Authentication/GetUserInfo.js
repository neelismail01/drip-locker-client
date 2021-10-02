import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const GetUserInfo = ({ handleSubmitUserInfo, switchPage }) => {
    const [nameFocus, setNameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleNextButtonPress = () => {
        setNameFocus(false)
        setEmailFocus(false);
        setPasswordFocus(false);
        setConfirmPasswordFocus(false)
        if (password === confirmPassword) {
            handleSubmitUserInfo(name, email, password)
        }
    }

    return (
        <View style={styles.formContainer}>
            <Text style={styles.registerHeader}>Create An Account</Text>
            <View style={styles.registerForm}>
                <TextInput
                    style={[styles.textInput, nameFocus && styles.focusInputStyle]}
                    name="name"
                    value={name}
                    onChangeText={text => setName(text)}
                    placeholder="Name"
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)}
                    blurOnSubmit={false}
                    autoCapitalize='none'
                />
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
                <TextInput
                    style={[styles.textInput, confirmPasswordFocus && styles.focusInputStyle]}
                    name="confirm password"
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    placeholder="Confirm Password"
                    onFocus={() => setConfirmPasswordFocus(true)}
                    onBlur={() => setConfirmPasswordFocus(false)}
                    blurOnSubmit={false}
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={handleNextButtonPress}
                    disabled={name === "" || email === "" || password === "" || confirmPassword === ""}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
            <Text
                style={styles.switchToRegister}
                onPress={() => switchPage()}
            >
                Already have an account? Log in
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
    registerHeader: {
        fontSize: 32,
        color: "#005591",
        fontWeight: "bold"
    },
    registerForm: {
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
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 7
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    switchToRegister: {
        fontSize: 15
    }
})

export default GetUserInfo;