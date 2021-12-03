import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const CardHeader = ({ userInfo, order, handleGoToFriendProfile }) => {
  const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  const date = order.datePosted.toString().substring(0, order.datePosted.toString().indexOf("T"));
  let dateParts = date.split("-");
  dateParts = dateParts.map((datePart) => { return parseInt(datePart - 1) });
  const formattedDate = `${monthNames[dateParts[1]]} ${dateParts[2]}, ${dateParts[0]}`;

  const postBelongsToLoggedInUser = order.user === userInfo.id;
  const name = postBelongsToLoggedInUser ? userInfo.name : order.user.name;

  return (
      <TouchableOpacity
        style={styles.orderNameContainer}
        onPress={() => handleGoToFriendProfile(order.user._id, order.user.name)}
        disabled={postBelongsToLoggedInUser}
      >
        <View style={styles.initialsCircle}>
            <Text style={styles.initialsText}>
              {name.split(" ").map(name => {
                  return name[0]
              })}
            </Text>
        </View>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.orderName}>{name}</Text>
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
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    marginRight: 15
  },
  textContainer: {
    height: 50,
    justifyContent: "space-evenly"
  },
  initialsText: {
    color: "white",
    fontSize: 14
  },
  orderName: {
    fontSize: 15,
    fontWeight: "bold"
  },
  orderDate: {
    fontSize: 12,
    color: "grey"
  }
});

export default CardHeader;