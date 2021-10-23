import React from "react";
import { StyleSheet, View, Image, Text, ScrollView, Dimensions } from "react-native";
import { Icon } from 'react-native-elements';

const { width } = Dimensions.get('window')

const ProductCarousel = ({ order, onchange }) => {
  return (
      <ScrollView
        style={styles.orderImagesCarousel}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate={"fast"}
        onScroll={({ nativeEvent }) => onchange(nativeEvent)}
        scrollEventThrottle={200}
        scrollEnabled={order.orderItems.length > 1}
      >
        {
          order.orderItems.map(item => {
            return (
              <View
                key={item._id}
                style={styles.productImageAndTag}
              >
                <Image
                  style={styles.productImage}
                  source={{ uri: item.product.image }}
                />
                <View style={styles.belowImageContainer}>
                  <View style={styles.productNameContainer}>
                    <Icon name="tag" type="font-awesome-5" color="black" size={14} />
                    <Text style={styles.productName}>
                      {item.product.name.length > 30 ? `${item.product.name.substr(0, 30)}...` : item.product.name}
                    </Text>
                  </View>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  orderImagesCarousel: {
    width: width,
  },
  storeName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 10
  },
  productImageAndTag: {
    alignItems: "flex-start"
  },
  productImage: {
    aspectRatio: 1,
    width: width
  },
  belowImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 10
  },
  productNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    marginHorizontal: 10
  },
  productName: {
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
    marginLeft: 10
  }
});

export default ProductCarousel;