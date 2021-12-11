import React, { useState, useCallback } from "react";
import { SafeAreaView, ActivityIndicator, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { AWS_BASE_URL } from "../../../util/common";

import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../Redux/userSlice";

import NotificationsHeader from "./NotificationsHeader";
import EmptyNotifications from "./EmptyNotifications";
import FriendRequestList from "./FriendRequestList";

const NotificationsMain = ({ navigation }) => {
  const accessToken = useSelector(selectAccessToken);
  const [friendRequests, setFriendRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const handleAcceptFriendRequest = async (friendRequest) => {
    try {
      await axios.put(
        `${AWS_BASE_URL}friends/${friendRequest._id}`,
        {},
        config
      );
    } catch (err) {
      console.log("Error accepting friend request");
      console.log(err);
    }
  };

  const handleGoToFriendProfile = (userId, userName) => {
    navigation.navigate("Profile Main", { userId, userName });
  };

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${AWS_BASE_URL}friends/requests`, config)
        .then((response) => {
          setFriendRequests(response.data.body);
        })
        .catch((error) => {
          console.log("An error occurred while getting your friend requests");
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [])
  );

  return isLoading ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <NotificationsHeader navigation={navigation} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" />
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <NotificationsHeader navigation={navigation} />
      {friendRequests.length === 0 ? (
        <EmptyNotifications />
      ) : (
        <FriendRequestList
          friendRequests={friendRequests}
          handleAcceptFriendRequest={handleAcceptFriendRequest}
          handleGoToFriendProfile={handleGoToFriendProfile}
        />
      )}
    </SafeAreaView>
  );
};

export default NotificationsMain;
