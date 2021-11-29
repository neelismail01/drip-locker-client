import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";

const { width } = Dimensions.get('window');

const PostResults = ({ results, type, handleGoToFullResults, handleGoToOrdersFeed }) => {
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionHeader}>
            {type === "Friend" ? "Friend" : "My" } Posts
          </Text>
          <TouchableOpacity onPress={() => handleGoToFullResults(type)}>
            <Text>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.resultsGrid}>
          {results.slice(0, 2).map(result => {
            return (
              <TouchableOpacity
                key={result._id}
                style={styles.orderCard}
                onPress={() => handleGoToOrdersFeed(type, result)}
              >
                <Image
                  source={{ uri: result.pictureUrls[0] }}
                  style={styles.orderCardImage}
                />
                <Text style={styles.businessName}>{result.brandName}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: 20
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18
  },
  resultsGrid: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  orderCard: {
    justifyContent: "center",
  },
  orderCardImage: {
    width: width * 0.5,
    height: width * 0.5,
    borderColor: "white",
    borderWidth: 2
  },
  businessName: {
    fontWeight: "bold",
    fontSize: 14,
    margin: 5
  },
});

export default PostResults;