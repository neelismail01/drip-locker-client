import React, { useState } from 'react';
import { StyleSheet, View, TextInput, SafeAreaView } from 'react-native';
import axios from 'axios';
import { GOOGLE_PLACES_API_KEY } from "@env";

import SearchAddressPrediction from './SearchAddressPrediction';

import { useDispatch } from 'react-redux';
import { setAddress } from '../../../Redux/registerSlice';

const SearchAddress = ({ navigation }) => {
    const [dest, setDest] = useState('');
    const [predictions, setPredictions] = useState([]);

    const dispatch = useDispatch();

    const handleSelectAddress = (prediction) => {
        const userAddress = {
            fullAddress: prediction.description,
            addressPrimaryText: prediction.structured_formatting.main_text,
            addressSecondaryText: prediction.structured_formatting.secondary_text,
            addressPlaceId: prediction.place_id
        }
        dispatch(setAddress(userAddress));
        navigation.navigate('Register Form');
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
                                <SearchAddressPrediction
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
        width: "100%",
        height: "100%",
        alignItems: "center",
        backgroundColor: "white"
    },
    textInput: {
        marginVertical: 20,
        height: 45,
        backgroundColor: "white",
        borderRadius: 7.5,
        borderColor: "white",
        borderWidth: 2,
        width: "80%",
        paddingHorizontal: 20,
        fontSize: 14,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 7
    },
    predictionsContainer: {
        width: "100%",
        paddingHorizontal: 40,

    }
})

export default SearchAddress;