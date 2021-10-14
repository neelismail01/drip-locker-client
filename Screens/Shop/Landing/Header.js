import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Icon } from 'react-native-elements'


const Header = () => {

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.header}>Shop</Text>
            <TouchableOpacity>
                <Icon name="search" type="font-awesome-5" color="black" size={20} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
    }
})

export default Header;