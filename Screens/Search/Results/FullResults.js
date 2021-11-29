import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import { Icon } from 'react-native-elements'
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

import { AWS_BASE_URL } from "@env";

import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../Redux/userSlice";

const { width } = Dimensions.get("window");

const FullResults = ({ navigation, route }) => {
  const { query, path } = route.params;
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [endReached, setEndReached] = useState(false);

  const accessToken = useSelector(selectAccessToken);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const handleGoToOrdersFeed = (order) => {
    const orders = results;
    const urlPath = `${path}?searchTerm=${query}&limit=10`
    navigation.push("Feed Main", {
      orders,
      order,
      page,
      urlPath
    });
  };

  const loadMore = () => {
    setPage(page + 1)
  };

  useFocusEffect(
    useCallback(() => {
      if (!endReached) {
        setLoading(true);
        axios.get(`${AWS_BASE_URL}${path}?searchTerm=${query}&limit=10&page=${page}`, config)
        .then((response) => {
          if (response.data.statusCode === 200) {
            if (response.data.body.length === 0) {
              setEndReached(true);
            }
            setResults([...results, ...response.data.body]);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          console.log("Api call error - getting search results");
        });
      }
    }, [page])
  );

  const FooterComponent = () => {
    return loading && <ActivityIndicator style={{marginTop: 15}} size="large" />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back'} type={'material'} size={20} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Search results for "{query}"</Text>
      </View>
      <FlatList
        data={results}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => item._id}
        ListFooterComponent={FooterComponent}
        onEndReached={loadMore}
        onEndReachedThreshold={0}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderCard}
            onPress={() => handleGoToOrdersFeed(item)}
          >
            <Image
              source={{ uri: item.pictureUrls[0] }}
              style={styles.orderCardImage}
            />
            <Text style={styles.businessName}>{item.brandName}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20
  },
  orderCard: {
    justifyContent: "center",
    marginBottom: 10
  },
  orderCardImage: {
    width: width * 0.5,
    height: width * 0.5,
    borderWidth: 2,
    borderColor: "white",
  },
  businessName: {
    fontWeight: "bold",
    fontSize: 12,
    margin: 5
  },
});

export default FullResults;