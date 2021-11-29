import React from "react";
import {
  StyleSheet,
  TextInput,
} from "react-native";


const SearchBar = ({ query, handleQueryChange }) => {

    return (
        <TextInput
            placeholder="Search Friends, Brands, and Categories"
            style={styles.searchBar}
            value={query}
            onChangeText={text => handleQueryChange(text)}
        />
    );
};

const styles = StyleSheet.create({
    searchBar: {
        borderRadius: 25,
        marginHorizontal: 20,
        backgroundColor: "#efefef",
        padding: 15
    }
});

export default SearchBar;