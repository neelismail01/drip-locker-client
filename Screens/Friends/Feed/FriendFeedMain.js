import React, { useState, useCallback, useRef } from "react";
import { SafeAreaView, ActivityIndicator, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

import { AWS_BASE_URL } from "../../../util/common";
import { useSelector } from "react-redux";
import { selectAccessToken, selectUserId } from "../../../Redux/userSlice";

import FeedHeader from "./FeedHeader";
import EmptyFeed from "./EmptyFeed";
import FeedCard from "../../../components/Feed/FeedCard";

const FeedMain = ({ navigation }) => {
  const accessToken = useSelector(selectAccessToken);
  const userId = useSelector(selectUserId);
  let scrollRef = useRef(null);

  const [friendOrders, setFriendOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [endReached, setEndReached] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const handleGoToNotifications = () => {
    navigation.navigate("Notifications Main")
  }

  const getFriendPosts = async (isLoading) => {
    axios.get(`${AWS_BASE_URL}orders/friends?limit=${10}&page=${page}`, config)
    .then((response) => {
      if (response.data.body.length > 0) {
        if (friendOrders.length === 0) {
          setFriendOrders([...response.data.body]);
        } else if (isLoading) {
          setFriendOrders([...friendOrders, ...response.data.body]);
        } else if (friendOrders[0]._id !== response.data.body[0]._id) {
          setFriendOrders([...response.data.body]);
        }
      }
      if (response.data.body.length < 10) {
        setEndReached(true);
      }
      setPage(page + 1);
    })
    .catch((err) => {
      console.log(err);
      console.log("Api call error - getting friend orders");
    })
    .finally(() => {
      setLoading(false);
      setRefreshing(false);
    });
  }

  const loadMore = () => {
    if (!endReached) {
      setLoading(true);
      getFriendPosts(true);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setEndReached(false);
    setPage(0);
    getFriendPosts(false);
  };

  useFocusEffect(
    useCallback(() => {
      getFriendPosts(true);
    }, [])
  );

  const renderFooter = () => {
    return loading && <ActivityIndicator size="small" />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <FeedHeader
        handleGoToNotifications={handleGoToNotifications}
      />
      <FlatList
        ref={scrollRef}
        contentContainerStyle={!loading && friendOrders.length === 0 && { flexGrow: 1, justifyContent: "center" }}
        data={friendOrders}
        keyExtractor={(item) => item._id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        ListEmptyComponent={<EmptyFeed loading={loading} />}
        ListFooterComponent={renderFooter}
        renderItem={({ item }) => (
          <FeedCard
            order={item}
            navigation={navigation}
            liked={item.likedBy.map((like) => like.userId).includes(userId)}
          />
        )}
      />
    </SafeAreaView>
  )
};

export default FeedMain;
