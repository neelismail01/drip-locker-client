import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Text, Image } from "react-native";
import { Icon } from 'react-native-elements';

const PurchaseDetailsMain = () => {
    const [images, setImages] = useState([]);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
            {
                images.length > 0 ?
                <View style={styles.imagesPreview}>

                </View> :
                <View style={[styles.imagesPreview, styles.noImageSelected]}>
                    <View style={styles.imageIconContainer}>
                        <Icon name="collections" type="material" color={'white'} size={36} />
                    </View>
                    <Text style={styles.noImagesText}>No Images Selected</Text>
                </View>

            }
            <View style={styles.body}>
                <TouchableOpacity>
                    <Text>Upload Image</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
};

const styles = StyleSheet.create({
    imagesPreview: {
        height: "40%",
        width: "100%"
    },
    noImageSelected: {
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center"
    },
    imageIconContainer: {
        height: 90,
        width: 90,
        borderRadius: 45,
        borderColor: "white",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    noImagesText: {
        color: "white",
        marginTop: 10,
        fontSize: 18
    },
    body: {
        height: "60%",
        width: "100%",
        backgroundColor: "white"
    }
});

export default PurchaseDetailsMain;