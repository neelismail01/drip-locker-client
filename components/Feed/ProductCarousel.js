import React from "react";
import { StyleSheet, View, Image, ScrollView, Dimensions } from "react-native";

const { width } = Dimensions.get('window')

const ProductCarousel = ({ order, onchange }) => {
  return (
      <ScrollView
        style={styles.orderImagesCarousel}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        snapToAlignment={"center"}
        decelerationRate={0}
        onScroll={({ nativeEvent }) => onchange(nativeEvent)}
        scrollEventThrottle={200}
        scrollEnabled={order.pictureUrls.length > 1}
      >
        {
          order.pictureUrls.map(pictureUrl => {
            return (
                <Image
                  key={pictureUrl}
                  style={styles.productImage}
                  source={{ uri: pictureUrl }}
                />
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