import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Icon } from 'react-native-elements';

const { width } = Dimensions.get('window')

const FriendOrderCard = ({ order, handleGoToFriendProfile }) => {
  const [imageActive, setImageActive] = useState(0);
  
  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide !== imageActive) {
        setImageActive(slide);
      }
    }
  }

  const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  const date = order.dateOrdered.toString().substring(0, order.dateOrdered.toString().indexOf("T"));
  let dateParts = date.split("-");
  dateParts = dateParts.map((datePart) => {
      return parseInt(datePart - 1);
  });
  const formattedDate = `${monthNames[dateParts[1]]} ${dateParts[2]}, ${dateParts[0]}`;

  return (
    <View style={styles.friendOrdersContainer}>
      <TouchableOpacity
        style={styles.orderNameContainer}
        onPress={() => handleGoToFriendProfile(order.user.id, order.user.name)}
      >
        <View style={styles.initialsCircle}>
            <Text style={styles.initialsText}>
              {order.user.name.split(" ").map(name => {
                  return name[0]
              })}
            </Text>
        </View>
        <View>
          <Text style={styles.orderName}>{order.user.name}</Text>
          <Text style={styles.orderDate}>{formattedDate}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.storeNameContainer}>
        <View style={styles.storeIconAndNameContainer}>
          <Icon name="store-alt" type="font-awesome-5" color="white" size={12} />
          <Text style={styles.storeName}>{order.business.name}</Text>
        </View>
        <Icon name="angle-right" type="font-awesome-5" color="white" size={14} />
      </TouchableOpacity>
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
                <View style={styles.productNameContainer}>
                  <Icon name="tag" type="font-awesome-5" color="black" size={12} />
                  <Text style={styles.productName}>
                    {item.product.name.length > 30 ? `${item.product.name.substr(0, 30)}...` : item.product.name}
                  </Text>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
      <View style={styles.dotWrapper}>
        {
          order.orderItems.length > 1 &&
          order.orderItems.map((item, index) => {
            return (
              <Text
                key={item._id}
                style={imageActive === index ? styles.dotActive : styles.dotInactive}
              >
                •
              </Text>
            )
          })
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  friendOrdersContainer: {
    width: "100%",
    backgroundColor: "white",
    marginVertical: 25
  },
  orderNameContainer: {
    width: width,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },
  initialsCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    marginRight: 10
  },
  initialsText: {
    color: "white",
    fontSize: 14
  },
  orderName: {
    fontSize: 14,
    fontWeight: "bold"
  },
  orderDate: {
    fontSize: 12,
    color: "grey"
  },
  orderImagesCarousel: {
    width: width,
  },
  storeNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "black",
    paddingVertical: 7.5,
    paddingHorizontal: 15
  },
  storeIconAndNameContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  productNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10
  },
  productName: {
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
    marginLeft: 10
  },
  dotWrapper: {
    flexDirection: "row",
    alignSelf: "center"
  },
  dotActive: {
    marginHorizontal: 2,
    color: "black",
    fontSize: 32
  },
  dotInactive: {
    marginHorizontal: 2,
    color: "grey",
    fontSize: 32
  }
});

export default FriendOrderCard;