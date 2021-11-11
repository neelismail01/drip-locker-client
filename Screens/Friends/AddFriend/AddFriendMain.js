import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import axios from "axios";
import { AWS_BASE_URL } from "@env";

import SearchResults from "./SearchResults";
import ReceivedRequests from "./ReceivedRequests";
import CurrentFriends from "./CurrentFriends";

import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../Redux/userSlice";

const AddFriendMain = ({ navigation }) => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [newFriends, setNewFriends] = useState([]);

  const accessToken = useSelector(selectAccessToken);

  const handleAcceptFriendRequest = async (friendRequest) => {
    try {
      const addedFriend = {
        _id: friendRequest.requester._id,
        name: friendRequest.requester.name,
        email: friendRequest.requester.email
      }
      setFriends([addedFriend, ...friends]);
      setReceivedRequests(receivedRequests.filter(request => request._id !== friendRequest._id));
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
    }
      await axios.put(`${AWS_BASE_URL}friends/${friendRequest._id}`, config);
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
      await axios.post(`${AWS_BASE_URL}friends`, { headers: { 'authorization': `Bearer ${accessToken}` } }, requestData);
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
      <TextInput
        placeholder="Add friends on OrderBud..."
        style={styles.enterAddressField}
        onChangeText={(text) => handleSearch(text)}
      />
      <ScrollView>
        {friends.length > 0 && (
          <CurrentFriends
            friends={friends}
            userId={user_id}
            handleGoToFriendProfile={handleGoToFriendProfile}
          />
        )}
        {receivedRequests.length > 0 && (
          <ReceivedRequests
            receivedRequests={receivedRequests}
            handleAcceptFriendRequest={handleAcceptFriendRequest}
          />
        )}
        {newFriends.length > 0 && (
          <SearchResults
            newFriends={newFriends}
            handleSendFriendRequest={handleSendFriendRequest}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  enterAddressField: {
    backgroundColor: "white",
    padding: 15,
    fontSize: 16,
    shadowColor: "#a6a6a6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    fontSize: 14,
    borderRadius: 15,
    marginVertical: 20,
    marginHorizontal: 20,
  },
});

export default AddFriendMain;
