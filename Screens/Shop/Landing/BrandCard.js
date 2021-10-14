import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const BrandCard = ({ business, navigation }) => {
    const { coverImage, name } = business;
 
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Brand Main', business)}>
            <Image
                style={styles.image}
                source={{ uri: coverImage !== '' ? coverImage :"https://www.cnu.org/sites/default/files/storefront-proportions.jpg"}}
            />
            <View style={styles.brandNameContainer}>
                <Text style={styles.brandName}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "45%",
        marginVertical: 10,
        height: 0.5 * width,
        elevation: 8,
        shadowColor: '#a6a6a6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 5
    },
    brandNameContainer: {
        position: "absolute",
        width: "95%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        bottom: 5,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 5
    },
    brandName: {
        fontWeight: "bold",
        fontSize: 12,
        marginLeft: 2.5
    }
})

export default BrandCard;