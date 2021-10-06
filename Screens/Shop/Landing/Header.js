import React from 'react';
import { View, StyleSheet, TextInput, SafeAreaView, Text } from "react-native";
import { Icon } from 'react-native-elements'


const Header = () => {

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.dripText}>Drip</Text>
            <View style={styles.searchBar}>
                <Icon name="search" type="font-awesome-5" color="black" size={16} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="What are you shopping for today?"
                    placeholderTextColor="black"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        padding: 15,
        backgroundColor: "black",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10
    },
    dripText: {
        color: "white",
        fontSize: 22,
        fontStyle: "italic",
        fontWeight: "bold",
        marginBottom: 10
    },
    searchBar: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 15,
        paddingLeft: 20,
        paddingVertical: 12.5,
    },
    searchInput: {
        width: "90%",
        fontSize: 14
    }
})

export default Header;