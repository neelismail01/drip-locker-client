import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Icon } from "react-native-elements";
import axios from "axios";
import { AWS_BASE_URL } from "../../../util/common";

import { useSelector, useDispatch } from "react-redux";
import { selectPostInfo, clearPost } from "../../../Redux/postSlice";
import { selectAccessToken } from "../../../Redux/userSlice";

const PurchaseDetails = ({ navigation }) => {
  const postInfo = useSelector(selectPostInfo);
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  }

  const handlePostPurchase = async () => {
    try {
      setLoading(true);

      const secureS3UrlPromises = postInfo.pictures.map(async picture => {
        const response = await axios.get(`${AWS_BASE_URL}s3-secure-url`, config);
        return response;
      })
  
      const secureS3UrlResponses = await Promise.all(secureS3UrlPromises);
      const secureS3Urls = secureS3UrlResponses.map(response => response.data.body);
  
      secureS3Urls.map(async (url, index) => {
        const response = await fetch(postInfo.pictures[index].uri);
        const blob = await response.blob();
        fetch(url, {
          method: "PUT",
          body: blob
        })
      })
  
      const imageUrls = secureS3Urls.map(url => url.split('?')[0]);
  
      const postData = {
        pictureUrls: imageUrls,
        tags: postInfo.productTags,
        brandName: postInfo.brandName,
        brandLogo: postInfo.brandLogo,
        brandWebsite: postInfo.brandWebsite,
        caption: postInfo.caption
      }

      await axios.post(`${AWS_BASE_URL}orders`, postData, config);
      setLoading(false);
      dispatch(clearPost());
      navigation.navigate('Purchase Camera')
    } catch (error) {
      console.log("error uploading to s3", error)
    }
  };

  return (
      loading ?
      <SafeAreaView style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" />
        <Text style={styles.uploadSpinnerText}>Uploading Your Post</Text>
      </SafeAreaView> :
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Text style={styles.header}>Add details to your post</Text>
          <Text style={styles.headerSubtext}>
            These details help your friends learn about and discover your purchase
            more easily.
          </Text>
          <View>
            <TouchableOpacity
              style={styles.postDetailsRow}
              onPress={() => navigation.navigate("Brand Search")}
            >
              <View style={styles.mainRow}>
                <Text style={styles.detailName}>Brand Details</Text>
                <Icon
                  name="chevron-right"
                  type="material"
                  color="black"
                  size={22}
                />
              </View>
              {postInfo.brandName !== "" && (
                <Text style={styles.brandNameText}>{postInfo.brandName}</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.postDetailsRow}
              onPress={() => navigation.navigate("Product Tagging")}
            >
              <View style={styles.mainRow}>
                <Text style={styles.detailName}>Product Tags</Text>
                <Icon
                  name="chevron-right"
                  type="material"
                  color="black"
                  size={22}
                />
              </View>
              <View style={styles.tagsContainer}>
                {postInfo.productTags.map((tag, index) => (
                  <Text key={index} style={styles.tagText}>
                    {tag}
                  </Text>
                ))}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.postDetailsRow}
              onPress={() => navigation.navigate("Caption")}
            >
              <View style={styles.mainRow}>
                <Text style={styles.detailName}>Caption</Text>
                <Icon
                  name="chevron-right"
                  type="material"
                  color="black"
                  size={22}
                />
              </View>
              {postInfo.caption !== "" && (
                <Text style={styles.brandNameText}>{postInfo.caption}</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: 20, marginVertical: 50 }}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handlePostPurchase}
            >
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginHorizontal: 20,
  },
  headerSubtext: {
    fontSize: 13,
    color: "grey",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  postDetailsRow: {
    padding: 20,
  },
  detailName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  brandNameText: {
    color: "grey",
    marginTop: 5,
  },
  tagsContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  tagText: {
    color: "grey",
    marginTop: 5,
    marginRight: 15,
  },
  buttonContainer: {
    height: 45,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7.5,
    backgroundColor: "black",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  uploadSpinnerText: {
    marginTop: 5,
    fontSize: 12,
    color: "grey"
  }
});

export default PurchaseDetails;
