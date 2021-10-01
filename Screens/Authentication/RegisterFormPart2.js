import React, { useState } from 'react';
import { StyleSheet, View, TextInput, SafeAreaView } from 'react-native';
import axios from 'axios';
import { GOOGLE_PLACES_API_KEY } from "@env";

import RegisterAddressPrediction from './RegisterAddressPrediction';

const RegisterFormPart2 = ({ handleSubmitAddress }) => {
    const [dest, setDest] = useState('');
    const [predictions, setPredictions] = useState([]);

    const handleSelectAddress = (prediction) => {
        const userAddress = {
            fullAddress: prediction.description,
            addressPrimaryText: prediction.structured_formatting.main_text,
            addressSecondaryText: prediction.structured_formatting.secondary_text,
            addressPlaceId: prediction.place_id
        }

        handleSubmitAddress(userAddress)
    }

    const handleChangeText = async (destination) => {
        setDest(destination);
        try {
            const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_PLACES_API_KEY}&input=${destination}`;
            const result = await axios.get(apiUrl);
            setPredictions(result.data.predictions);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SafeAreaView style={styles.addressContainer}>
            <TextInput
                style={styles.textInput}
                value={dest}
                onChangeText={destination => handleChangeText(destination)}
                name="address"
                placeholder="Enter a default address"
            />
            <View style={styles.predictionsContainer}>
                    {
                        predictions.map(prediction => {
                            return (
                                <RegisterAddressPrediction
                                    key={prediction.place_id}
                                    prediction={prediction}
                                    handleSelectAddress={handleSelectAddress}
                                />
                            );
                        })
                    }
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    addressContainer: {
        width: "80%",
        height: "100%",
        alignItems: "flex-end"
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
    predictionsContainer: {
        width: "100%"
    }
})

export default RegisterFormPart2;