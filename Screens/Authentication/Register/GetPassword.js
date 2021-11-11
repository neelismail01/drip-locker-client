import React, { useState } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, View, TextInput, TouchableOpacity } from 'react-native';


const GetPassword = ({ handleSetPassword }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCheckPassword = () => {
        if (password === confirmPassword) {
            handleSetPassword(password);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.header}>Enter A Password</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    name="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.textInput}
                    name="confirm password"
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
                onPress={handleCheckPassword}
                style={styles.button}
                disabled={password === "" || confirmPassword === ""}
            >
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
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
    inputContainer: {
        width: "100%",
        marginVertical: 30
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
        shadowRadius: 7
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    }
})

export default GetPassword;