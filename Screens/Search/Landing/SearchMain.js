import React, { useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import { AWS_BASE_URL } from "@env";

import SearchBar from './SearchBar';
import SearchResults from "./SearchResults";
import ReceivedRequests from "./ReceivedRequests";
import CurrentFriends from "./CurrentFriends";

import { useSelector } from "react-redux";
import { selectAccessToken, selectUserId } from "../../../Redux/userSlice";

const SearchMain = ({ navigation }) => {
  const userId = useSelector(selectUserId);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [newFriends, setNewFriends] = useState([]);

  const accessToken = useSelector(selectAccessToken);

  const handleAcceptFriendRequest = async (friendRequest) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
      await axios.put(`${AWS_BASE_URL}friends/${friendRequest._id}`, {}, config);
    } catch (err) {
      console.log("Error accepting friend request");
      console.log(err);
    }
  };

  const handleSendFriendRequest = async (recipient) => {
    try {
      const requestData = {
        recipient: recipient,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }

      await axios.post(`${AWS_BASE_URL}friends`, requestData, config);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoToFriendProfile = (userId, userName) => {
    navigation.navigate("Profile Main", { userId, userName });
  };

  const handleSearch = async (text) => {
    try {
      if (text.length > 0) {
        const response = await axios.get(`${AWS_BASE_URL}users?searchTerm=${text}`, { headers: { 'authorization': `Bearer ${accessToken}` } });
        setReceivedRequests(response.data.body.friendRequests);
        setFriends(response.data.body.friends);
        setNewFriends(response.data.body.newUsers);
      } else {
        setReceivedRequests([]);
        setFriends([]);
        setNewFriends([]);
      }
    } catch (err) {
      console.log("Error searching for user");
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <SearchBar handleSearch={handleSearch} />
        <ScrollView>
          {friends.length > 0 && (
            <CurrentFriends
              friends={friends}
              userId={userId}
              handleGoToFriendProfile={handleGoToFriendProfile}
            />
          )}
          {receivedRequests.length > 0 && (
            <ReceivedRequests
              receivedRequests={receivedRequests}
              handleAcceptFriendRequest={handleAcceptFriendRequest}
              handleGoToFriendProfile={handleGoToFriendProfile}
            />
          )}
          {newFriends.length > 0 && (
            <SearchResults
              newFriends={newFriends}
              handleSendFriendRequest={handleSendFriendRequest}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default SearchMain;