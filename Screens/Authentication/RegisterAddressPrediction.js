import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const RegisterAddressPrediction = ({ prediction, handleSelectAddress }) => {
    return (
        <TouchableOpacity
            style={styles.prediction}
            onPress={() => handleSelectAddress(prediction)}
        >
            <View
                style={styles.iconContainer}
            >
                <Icon
                    name="map-marker-alt"
                    type="font-awesome-5" 
                    color="black"
                    size={16}
                />
            </View>
            <View
                style={styles.destinationDetails}
            >
                <Text
                    style={styles.addressMain}
                >
                    {prediction.structured_formatting.main_text}
                </Text>
                <Text
                    style={styles.addressSecondary}
                >
                    {prediction.structured_formatting.secondary_text}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    prediction: {
        backgroundColor: "white",
        paddingVertical: 17.5,
        borderBottomWidth: 0.25,
        borderBottomColor: "grey",
        flexDirection: "row",
        alignItems: "center",
        width: "100%"
    },
    iconContainer: {
        height: 36,
        width: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "grey",
        justifyContent: "center",
        alignItems: "center"
    },
    destinationDetails: {
        marginLeft: 20
    },
    addressMain: {
        fontSize: 16,
        fontWeight: "bold",
        flexWrap: "wrap"
    },
    addressSecondary: {
        color: "grey",
        fontSize: 12,
        marginTop: 7.5,
        flexWrap: "wrap"
    }
})

export default RegisterAddressPrediction;