import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, setUserInfo } from '../../../Redux/userSlice';

import { BASE_URL } from "@env"

const PersonalInformation = () => {
    const { id, name, email } = useSelector(selectUserInfo);
    const dispatch = useDispatch();

    const [updatedName, setUpatedName] = useState(name);
    const [updatedEmail, setUpdatedEmail] = useState(email);

    const handlePressUpdateButton = async () => {
        try {
            const response = await axios.put(`${BASE_URL}users/changeDetails/${id}`, { 
                name: updatedName,
                email: updatedEmail 
            })
            dispatch(setUserInfo(response.data));
        } catch (err) {
            console.log(err);
            console.log('An error occurred while changing your personal information. Please try again.');
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.personalInfoContainer}>
                <Text style={styles.header}>Personal Information</Text>
                <View style={styles.inputsContainer}>
                    <View style={styles.inputWithHeader}>
                        <Text style={styles.inputHeaderText}>Name</Text>
                        <TextInput
                            name="name"
                            value={updatedName}
                            style={styles.userInput}
                            onChangeText={text => setUpatedName(text)}
                        />
                    </View>
                    <View style={styles.inputWithHeader}>
                        <Text style={styles.inputHeaderText}>Email</Text>
                        <TextInput
                            name="email"
                            value={updatedEmail}
                            style={styles.userInput}
                            onChangeText={text => setUpdatedEmail(text)}
                            autoCapitalize='none'
                        />
                    </View>
                </View>
                <View style={styles.updateButtonContainer}>
                    <TouchableOpacity
                        style={[styles.button, updatedName === name && updatedEmail === email ? styles.disabledButton : styles.updateButton]}
                        onPress={handlePressUpdateButton}
                    >
                        <Text
                            style={[updatedName === name && updatedEmail === email ? styles.disabledButtonText : styles.updateButtonText]}
                        >
                            Update
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    personalInfoContainer: {
        padding: 40
    },
    header: {
        fontSize: 28,
        fontWeight: "bold"
    },
    inputsContainer: {
        marginTop: 20
    },
    inputWithHeader: {
        marginVertical: 30,
    },
    inputHeaderText: {
        fontSize: 12,
        color: "grey"
    },
    userInput: {
        borderBottomWidth: 0.75,
        paddingVertical: 10,
        fontSize: 16
    },
    updateButtonContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40
    },
    button: {
        paddingVertical: 20,
        alignItems: "center",
        borderRadius: 7.5,
        width: "100%"
    },
    disabledButton: {
        backgroundColor: "#a8a8a8"
    },
    updateButton: {
        backgroundColor: "black",
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 7
    },
    disabledButtonText: {
        color: "black",
    },
    updateButtonText: {
        color: "white",
        fontWeight: "bold"
    }
})

export default PersonalInformation;