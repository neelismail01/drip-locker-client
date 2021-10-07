import React from 'react';
import { View, StyleSheet, TextInput, SafeAreaView, Text } from "react-native";
import { Icon } from 'react-native-elements'


const Header = () => {

    return (
        <View style={styles.searchBar}>
            <Icon name="search" type="font-awesome-5" color="black" size={16} />
            <TextInput
                style={styles.searchInput}
                placeholder="What are you shopping for today?"
                placeholderTextColor="black"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        width: "100%",
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 15,
        paddingLeft: 20,
        paddingVertical: 15,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 17
    },
    searchInput: {
        width: "90%",
        fontSize: 14
    }
})

export default Header;