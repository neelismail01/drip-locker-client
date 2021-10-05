import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from "react-native";

var { width } = Dimensions.get("window");

const FriendOrderCard = (props) => {
  const { order } = props;
  const [showItems, setShowItems] = useState(false);

  const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];

  const date = order.dateOrdered.toString().substring(0, order.dateOrdered.toString().indexOf("T"));
  let dateParts = date.split("-");
  dateParts = dateParts.map((datePart) => {
      return parseInt(datePart - 1);
  });
  const formattedDate = `${monthNames[dateParts[1]]} ${dateParts[2]}, ${dateParts[0]}`;

  const handleShowItems = () => {
    setShowItems(!showItems);
  };

  return (
    <View style={styles.productContainer}>
      <View style={[{flexDirection: "row", marginBottom: 10}, styles.viewMenuContainer]}>
          <Text style={{ color: "black"}}>Order From</Text>
          <TouchableOpacity>
            <Text style={{ color: "#005591", marginLeft: 4, fontWeight: "bold"}}>{order.user.name}</Text>
          </TouchableOpacity>
      </View>
      <Image
          style={styles.coverImage}
          source={{ uri: order.business.coverImage }}
      />
      <View style={{flexDirection: "row", marginTop: 10, justifyContent: "space-between" }}>
        <Text style={styles.header}>{order.business.name}</Text>
        <Text style={styles.subText}>{formattedDate} • {order.totalQuantity} {order.totalQuantity === 1 ? 'Item' : 'Items'}</Text>
      </View>
      <TouchableOpacity style={styles.showItems} onPress={handleShowItems}>
          <Text style={{ fontSize: 12, fontWeight: "bold", color: "white" }}>{showItems ? "Hide Items" : "Show Items"}</Text>
      </TouchableOpacity>
      {
        showItems &&
          order.orderItems.map((item) => {
            return (
              <View key={item._id} style={styles.itemContainer}>
                  <View style={styles.quantityContainer}>
                      <View style={styles.quantity}>
                          <Text style={styles.quantityText}>{item.quantity}</Text>
                      </View>
                  </View>
                  <View style={styles.itemNameContainer}>
                      <Text style={styles.cartItemText}>{item.product.name}</Text>
                  </View>
              </View>
            );
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20
  },
  coverImage: {
    height: 175,
    width: "100%",
    borderRadius: 5
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    marginRight: 10,
    marginVertical: 2.5,
    color: "grey",
    fontSize: 14,
  },
  showItems: {
    backgroundColor: "#005591",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 15,
  },
  itemContainer: {
    flexDirection: "row",
  },
  quantityContainer: {
    paddingVertical: 10,
  },
  quantity: {
    backgroundColor: "#E8E8E8",
    height: 26,
    width: 26,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  quantityText: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  itemNameContainer: {
    justifyContent: "center",
    paddingVertical: 10,
  },
  cartItemText: {
    fontSize: 14,
    marginLeft: 12.5,
  }
});

export default FriendOrderCard;