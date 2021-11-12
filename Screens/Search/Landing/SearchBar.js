import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";


const SearchBar = ({ handleSearch }) => {
    const [query, setQuery] = useState('');

    const handleChangeText = (text) => {
        setQuery(text);
        handleSearch(text);
    }

    return (
        <TextInput
            placeholder="Search Friends, Brands, and Categories"
            style={styles.searchBar}
            value={query}
            onChangeText={text => handleChangeText(text)}
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