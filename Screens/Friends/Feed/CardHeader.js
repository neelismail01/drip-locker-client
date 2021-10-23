import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const CardHeader = ({ order, handleGoToFriendProfile }) => {

  const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  const date = order.dateOrdered.toString().substring(0, order.dateOrdered.toString().indexOf("T"));
  let dateParts = date.split("-");
  dateParts = dateParts.map((datePart) => {
      return parseInt(datePart - 1);
  });
  const formattedDate = `${monthNames[dateParts[1]]} ${dateParts[2]}, ${dateParts[0]}`;

  return (
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
          <View style={styles.textContainer}>
            <Text style={styles.orderName}>{order.user.name}</Text>
            <Text style={styles.orderDate}>{formattedDate}</Text>
            </View>
        </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderNameContainer: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  initialsCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    marginRight: 15
  },
  textContainer: {
    height: 40,
    justifyContent: "space-evenly"
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
  }
});

export default CardHeader;