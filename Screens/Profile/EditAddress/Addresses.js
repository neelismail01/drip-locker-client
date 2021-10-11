import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import axios from 'axios';

import AddressRow from './AddressRow';
import { BASE_URL } from "@env"

import { useSelector, useDispatch } from 'react-redux';
import { selectUserAddresses, selectUserId, setUserInfo } from '../../../Redux/userSlice';

const Addresses = ({ navigation }) => {
    const addresses = useSelector(selectUserAddresses);
    const id = useSelector(selectUserId);
    const dispatch = useDispatch();

    const handleChangePreferredAddress = async (address) => {
        try {
            if (!address.active) {
                const response = await axios.put(`${BASE_URL}users/changeActiveAddress/${id}`, {
                    newActiveAddressPlaceId: address.addressPlaceId
                })
                dispatch(setUserInfo(response.data));
            }
        } catch (err) {
            console.log(err);
            console.log("An error occured while changing your preferred address.")
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.addressesContainer}>
                <Text style={styles.header}>Addresses</Text>
                {
                    addresses.map(address => {
                        console.log()
                        return (
                            <AddressRow
                                key={address.addressPlaceId}
                                address={address}
                                handleChangePreferredAddress={handleChangePreferredAddress}
                            />
                        )
                    })
                }
                <View style={styles.addAddressButtonContainer}>
                    <TouchableOpacity
                        style={styles.addAddressButton}
                        onPress={() => navigation.navigate('Search Address', { id })}
                    >
                        <Text style={styles.addAddressButtonText}>Add Address</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    addressesContainer: {
        padding: 40
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20
    },
    addAddressButtonContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 60
    },
    addAddressButton: {
        paddingVertical: 20,
        paddingHorizontal: 100,
        width: "100%",
        alignItems: "center",
        borderRadius: 7.5,
        backgroundColor: "black",
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 7
    },
    addAddressButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    }
})

export default Addresses;