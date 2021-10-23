import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

const CardFooter = ({ order, isLiked, handleLikePhoto, imageActive }) => {

  return (
        <View style={styles.cardFooter}>
            <TouchableOpacity
              style={styles.likeIcon}
              onPress={handleLikePhoto}
            >
              <Icon
                name={isLiked ? "favorite" : "favorite-border"}
                type="material"
                color={isLiked ? "red" : "black"}
                size={28} />
            </TouchableOpacity>
            <View style={styles.dotWrapper}>
              {
                order.orderItems.length > 1 &&
                order.orderItems.map((item, index) => {
                  return (
                    <Icon
                      key={item._id}
                      name="circle"
                      type="material"
                      color={imageActive === index ? 'black' : 'grey'}
                      size={8}
                      style={imageActive === index ? styles.dotActive : styles.dotInactive}
                    />
                  )
                })
              }
            </View>
        </View>
  );
};

const styles = StyleSheet.create({
    cardFooter: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%"
    },
    likeIcon: {
        position: "absolute",
        height: 40,
        width: 40,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    dotWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 40
    },
    dotActive: {
        marginHorizontal: 5,
        color: "black",
        fontSize: 32
    },
    dotInactive: {
        marginHorizontal: 5,
        color: "grey",
        fontSize: 32
    }
});

export default CardFooter;