import React from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';

const BrandCategories = (props) => {

    return (
        <ScrollView
            horizontal={true}
            bounces={true}
            contentContainerStyle={styles.horizontalScrollContainer}
            showsHorizontalScrollIndicator={false}
        >
            {props.categories.map(category => {
                return (
                    <TouchableOpacity
                        key={category._id}
                        style={styles.menuFilterTextContainer}
                    >
                        <Text style={styles.menuFilterText}>{category.name}</Text>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    horizontalScrollContainer: {
        backgroundColor: "white",
        paddingBottom: 15,
    },
    menuFilterTextContainer: {
        marginHorizontal: 5,
        paddingHorizontal: 20,
        paddingVertical: 7.5,
        borderRadius: 15,
        backgroundColor: "black",
    },
    menuFilterText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 12
    },
})

export default BrandCategories;