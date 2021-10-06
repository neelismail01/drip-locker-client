import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

import ProductCard from './ProductCard';


const BrandProducts = ({ categories, products }) => {
    return (
        <View style={styles.productCategoryContainer}>
            {
                categories.map(category => {
                    return (
                        <View>
                            <Text style={styles.categoryHeaderText}>{category.name}</Text>
                            <View style={styles.productsContainer}>
                                {
                                    products.map(product => {
                                        return (
                                            <View key={product.id}>
                                                {
                                                    <ProductCard product={product} />
                                                }
                                            </View>
                                        );
                                    })
                                }
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )

}

const styles = StyleSheet.create({
    productCategoryContainer: {
        width: "100%",
        padding: 20
    },
    categoryHeaderText: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10
    },
    productsContainer: {
        flexWrap: 'wrap',
        flexDirection: "row",
        justifyContent: "space-between"
    }
})

export default BrandProducts;