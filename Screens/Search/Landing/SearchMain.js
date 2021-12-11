import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView, KeyboardAvoidingView, ScrollView } from "react-native";
import axios from "axios";
import { AWS_BASE_URL } from "../../../util/common";

import SearchHeader from "./SearchHeader";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import ReceivedRequests from "./ReceivedRequests";
import CurrentFriends from "./CurrentFriends";
import PostResults from "./PostResults";

import { useSelector } from "react-redux";
import { selectAccessToken, selectUserId } from "../../../Redux/userSlice";

const SearchMain = ({ navigation }) => {
  const userId = useSelector(selectUserId);
  const [query, setQuery] = useState('')
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [newFriends, setNewFriends] = useState([]);
  const [friendPosts, setFriendPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const accessToken = useSelector(selectAccessToken);

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

  const handleSendFriendRequest = async (recipient) => {
    try {
      const requestData = { recipient };
      await axios.post(`${AWS_BASE_URL}friends`, requestData, config);
    } catch (err) {
      console.log("Error sending friend request")
      console.log(err);
    }
  };

  const handleGoToFriendProfile = (userId, userName) => {
    navigation.navigate("Profile Main", { userId, userName });
  };

  const handleGoToFullResultsFriend = () => {
    const path = "orders/friends";
    navigation.navigate("Full Results", { query, path });
  }

  const handleGoToFullResultsUser = () => {
    const path = `orders/user/${userId}`;
    navigation.navigate("Full Results", { query, path });
  }

  const handleGoToOrdersFeedFriend = (order) => {
    const orders = friendPosts;
    const path = "orders/friends";
    const urlPath = `${path}?searchTerm=${query}&limit=10`;
    const page = 1
    navigation.push("Feed Main", {
      orders,
      order,
      page,
      urlPath
    });
  };

  const handleGoToOrdersFeedUser = (order) => {
    const orders = userPosts;
    const path = `orders/user/${userId}`;
    const urlPath = `${path}?searchTerm=${query}&limit=10`;
    const page = 1
    navigation.push("Feed Main", {
      orders,
      order,
      page,
      urlPath
    });
  }

  const handleQueryChange = (text) => {
    setQuery(text)
  }

  useFocusEffect(
    useCallback(() => {
      if (query.length === 0) {
        setReceivedRequests([]);
        setFriends([]);
        setNewFriends([]);
      } else if (query.length > 2) {
        axios.get(`${AWS_BASE_URL}users?searchTerm=${query}`, config)
        .then(response => {
          setReceivedRequests(response.data.body.friendRequests);
          setFriends(response.data.body.friends);
          setNewFriends(response.data.body.newUsers);
        })
        .catch(err => {
          console.log("An error occurred while searching for users")
          console.log(err);
        })
      }
    }, [query])
  )

  useFocusEffect(
    useCallback(() => {
      if (query.length === 0) {
        setFriendPosts([]);
      } else if (query.length > 2) {
        axios.get(`${AWS_BASE_URL}orders/friends?searchTerm=${query}&limit=10&page=0`, config)
        .then(response => {
          setFriendPosts(response.data.body);
        })
        .catch(err => {
          console.log("An error occurred while searching for friend orders")
          console.log(err)
        })
      }
    }, [query])
  )

  useFocusEffect(
    useCallback(() => {
      if (query.length === 0) {
        setUserPosts([]);
      } else if (query.length > 2) {
        axios.get(`${AWS_BASE_URL}orders/user/${userId}?searchTerm=${query}&limit=10&page=0`, config)
        .then(response => {
          setUserPosts(response.data.body);
        })
        .catch(err => {
          console.log("An error occurred while searching for user orders");
          console.log(err);
        })
      }
    }, [query])
  )


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SearchHeader />
        <SearchBar query={query} handleQueryChange={handleQueryChange} />
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
          {friendPosts.length > 0 && (
            <PostResults
              results={friendPosts}
              type="Friend"
              handleGoToFullResults={handleGoToFullResultsFriend}
              handleGoToOrdersFeed={handleGoToOrdersFeedFriend}
            />
          )}
          {userPosts.length > 0 && (
            <PostResults
              results={userPosts}
              type="User"
              handleGoToFullResults={handleGoToFullResultsUser}
              handleGoToOrdersFeed={handleGoToOrdersFeedUser}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SearchMain;
