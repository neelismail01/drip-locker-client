import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

const GetEmail = ({ handleSetEmail }) => {
    const [email, setEmail] = useState('');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.header}>What's your email?</Text>
            <TextInput
                style={styles.textInput}
                name="email"
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder="Email"
                autoCapitalize='none'
            />
            <TouchableOpacity
                onPress={() => handleSetEmail(email)}
                style={styles.button}
                disabled={email === ""}
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
    textInput: {
        marginVertical: 30,
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

export default GetEmail