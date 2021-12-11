import React from "react";
import {
  StyleSheet,
  TextInput,
} from "react-native";


const SearchBar = ({ query, handleQueryChange }) => {

    return (
        <TextInput
            placeholder="Friends, Brands, and Categories"
            style={styles.searchBar}
            value={query}
            onChangeText={text => handleQueryChange(text)}
        />
    );
};

const styles = StyleSheet.create({
    searchBar: {
        borderRadius: 5,
        marginHorizontal: 20,
        backgroundColor: "#efefef",
        paddingHorizontal: 15,
        paddingVertical: 10
    }
});

export default SearchBar;