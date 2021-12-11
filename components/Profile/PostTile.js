import React from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  View
} from "react-native";

const { width } = Dimensions.get("window");

const PostTile = ({ post, handleGoToOrdersFeed }) => {
    let tags = [];
    let tagsLength = 0;
    const MAX_TAG_LENGTH = 20;

    for (let i = 0; i < post.tags.length; i++) {
        if (tagsLength + post.tags[i].length < MAX_TAG_LENGTH) {
            tagsLength += post.tags[i].length;
            tags.push(post.tags[i]);
        } else {
            break;
        }
    }

    return (
        <TouchableOpacity
            style={styles.orderCard}
            onPress={() => handleGoToOrdersFeed(post)}
        >
            <Image
                source={{ uri: post.pictureUrls[0] }}
                style={styles.orderCardImage}
            />
            <View style={styles.brandLogoContainer}>
                <Image
                    source={{ uri: post.brandLogo }}
                    style={styles.brandLogo}
                />
            </View>
            <Text style={styles.brandName}>{post.brandName}</Text>
            <View style={styles.tagContainer}>
                {
                    tags.map((tag, index) => {
                        return (
                            <Text key={index} style={styles.tagText}>{tag}</Text>
                        )
                    })
                }
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
  orderCard: {
    justifyContent: "center",
    marginBottom: 15,
  },
  orderCardImage: {
    width: width * 0.5,
    height: width * 0.5,
    borderWidth: 2,
    borderColor: "white",
  },
  brandLogo: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    resizeMode: "contain",
    marginLeft: 10,
    marginTop: -17.5,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#efefef"
  },
  brandName: {
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 10,
    margin: 5
  },
  tagContainer: {
    flexDirection: "row",
    marginLeft: 10
  },
  tagText: {
    color: "grey",
    fontSize: 12,
    marginRight: 10
  }
});

export default PostTile;
