import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Icon } from 'react-native-elements';

const CardFooter = ({ order, isLiked, likeCount, handleLikePhoto, imageActive }) => {

  return (
        <View style={styles.cardFooter}>
          <View style={styles.likeButtonAndPictureIndicator}>
            <TouchableOpacity
              style={styles.likeIcon}
              onPress={handleLikePhoto}
            >
              <Icon
                name={isLiked ? "favorite" : "favorite-border"}
                type="material"
                color={isLiked ? "red" : "black"}
                size={28}
              />
              <Text style={styles.likesCount}>
                {likeCount} {likeCount === 1 ? "like" : "likes"}
              </Text>
            </TouchableOpacity>
            <View style={styles.dotWrapper}>
              {
                order.pictureUrls.length > 1 &&
                order.pictureUrls.map((item, index) => {
                  return (
                    <Icon
                      key={item}
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
        </View>
  );
};

const styles = StyleSheet.create({
    cardFooter: {
        width: "100%"
    },
    likeButtonAndPictureIndicator: {
      flexDirection: "row",
      justifyContent: "center",
    },
    likeIcon: {
        position: "absolute",
        height: 40,
        left: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    likesCount: {
      marginLeft: 7.5,
      fontWeight: "bold"
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
    },
    caption: {
      marginHorizontal: 10
    }
});

export default CardFooter;