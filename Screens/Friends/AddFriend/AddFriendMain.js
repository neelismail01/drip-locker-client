import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "@env";

import SearchResults from "./SearchResults";
import ReceivedRequests from "./ReceivedRequests";
import CurrentFriends from "./CurrentFriends";

import { useSelector } from "react-redux";
import { selectUserId } from "../../../Redux/userSlice";

const AddFriendMain = ({ navigation }) => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [newFriends, setNewFriends] = useState([]);

  const userId = useSelector(selectUserId);

  const handleAcceptFriendRequest = async (friendRequest) => {
    try {
      const requestData = {
        requestId: friendRequest._id,
        requester: friendRequest.requester._id,
        recipient: friendRequest.recipient._id,
      };
      const response = await axios.put(`${BASE_URL}friends/acceptFriendRequest`, requestData);
    } catch (err) {
      console.log("Error accepting friend request");
      console.log(err);
    }
  };

  const handleSendFriendRequest = async (recipient) => {
    try {
      const requestData = {
        requester: userId,
        recipient: recipient,
      };
      const response = await axios.post(`${BASE_URL}friends/sendFriendRequest`, requestData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoToFriendProfile = (friendUserId, friendName) => {
    navigation.navigate("Friend Profile Main", { friendUserId, friendName });
  };

  const handleSearch = async (text) => {
    try {
      if (text.length > 1) {
        const response = await axios.get(`${BASE_URL}friends/search/${userId}?searchTerm=${text}`);
        setReceivedRequests(response.data.friendRequests);
        setFriends(response.data.friends);
        setNewFriends(response.data.newUsers);
      } else if (text.length === 0) {
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
            userId={userId}
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
