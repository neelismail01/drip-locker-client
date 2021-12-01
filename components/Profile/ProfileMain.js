import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

import { AWS_BASE_URL } from "@env";

import { useSelector } from "react-redux";
import { selectUserInfo } from "../../Redux/userSlice";

import ProfileHeader from "./ProfileHeader";
import ProfileInformation from "./ProfileInformation";
import OrdersFilter from "./OrdersFilter";
import EmptyOrders from "./EmptyOrders";
import EmptyLikes from "./EmptyLikes";
import PostTile from "./PostTile";

const ProfileMain = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [dripScore, setDripScore] = useState(null);
  const [numberOfOrders, setNumberOfOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dripScoreRefreshing, setDripScoreRefreshing] = useState(false);
  const [postsCountRefreshing, setPostsCountRefreshing] = useState(false);
  const [postsRefreshing, setPostsRefreshing] = useState(false);

  const [myOrders, setMyOrders] = useState([]);
  const [myOrdersPage, setMyOrdersPage] = useState(0);
  const [endMyOrdersReached, setEndMyOrdersReached] = useState(false);

  const [likedOrders, setLikedOrders] = useState([]);
  const [likedOrdersPage, setLikedOrdersPage] = useState(0);
  const [endLikedOrdersReached, setEndLikedOrdersReached] = useState(false);

  const userInfo = useSelector(selectUserInfo);
  const accessToken = userInfo.accessToken;
  const userId = route.params ? route.params.userId : userInfo.id;
  const userName = route.params ? route.params.userName : userInfo.name;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const handleGoToSettings = () => {
    navigation.navigate("Settings Main");
  };

  const handleGoToOrdersFeed = (order) => {
    const orders = activeTab === 0 ? myOrders : likedOrders;
    const page = activeTab === 0 ? myOrdersPage : likedOrdersPage;
    const urlPath =
      activeTab === 0
        ? `orders/user/${userId}?limit=10`
        : `orders/user/${userId}/liked?limit=10`;
    navigation.push("Feed Main", {
      orders,
      order,
      page,
      urlPath,
    });
  };

  const handleChangeToOrdersTab = () => {
    if (activeTab !== 0) {
      setActiveTab(0);
    }
  };

  const handleChangeToLikedTab = () => {
    if (activeTab !== 1) {
      setActiveTab(1);
    }
  };

  const loadMore = () => {
    if (activeTab === 0 && !endMyOrdersReached) {
      setLoading(true);
      setMyOrdersPage(myOrdersPage + 1);
    } else if (activeTab === 1 && !endLikedOrdersReached) {
      setLoading(true);
      setLikedOrdersPage(likedOrdersPage + 1);
    }
  };

  const handleRefresh = () => {
    setDripScoreRefreshing(true);
    setPostsCountRefreshing(true);
    setPostsRefreshing(true);
    if (activeTab === 0) {
      setMyOrdersPage(0);
      setEndMyOrdersReached(false);
    } else {
      setLikedOrdersPage(0);
      setEndLikedOrdersReached(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (
        (activeTab === 0 && !endMyOrdersReached) ||
        (activeTab === 1 && !endLikedOrdersReached)
      ) {
        if (!postsRefreshing) {
          setLoading(true);
        }
        const path =
          activeTab === 0
            ? `orders/user/${userId}?limit=${10}&page=${myOrdersPage}`
            : `orders/user/${userId}/liked?limit=${10}&page=${likedOrdersPage}`;
        axios
          .get(`${AWS_BASE_URL}${path}`, config)
          .then((response) => {
            if (response.data.statusCode === 200) {
              if (activeTab === 0) {
                if (response.data.body.length < 10) {
                  setEndMyOrdersReached(true);
                }

                if (postsRefreshing) {
                  setMyOrders([...response.data.body])
                } else {
                  setMyOrders([...myOrders, ...response.data.body]);
                }
              } else if (activeTab === 1) {
                if (response.data.body.length === 0) {
                  setEndLikedOrdersReached(true);
                }

                if (postsRefreshing) {
                  setLikedOrders([...response.data.body])
                } else {
                  setLikedOrders([...likedOrders, ...response.data.body]);
                }
              }
            }
          })
          .catch((err) => {
            console.log(err);
            console.log("Api call error - getting orders");
          })
          .finally(() => {
            setLoading(false);
            setPostsRefreshing(false);
          })
      }
    }, [myOrdersPage, likedOrdersPage, activeTab])
  );

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${AWS_BASE_URL}users/${userId}/drip-score`, config)
        .then((response) => {
          if (response.data.statusCode === 200) {
            setDripScore(response.data.body);
          }
        })
        .catch((err) => {
          console.log(err);
          console.log("Api call error - getting drip score");
        })
        .finally(() => {
          setDripScoreRefreshing(false);
        });
    }, [dripScoreRefreshing])
  );

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${AWS_BASE_URL}orders/user/${userId}/total`, config)
        .then((response) => {
          if (response.data.statusCode === 200) {
            setNumberOfOrders(response.data.body);
          }
        })
        .catch((err) => {
          console.log(err);
          console.log("Api call error - getting drip score");
        })
        .finally(() => {
          setPostsCountRefreshing(false);
        });
    }, [postsCountRefreshing])
  );

  const HeaderComponent = () => {
    return (
      <>
        <ProfileInformation
          numberOfOrders={numberOfOrders}
          dripScore={dripScore}
          userName={userName}
        />
        <OrdersFilter
          activeTab={activeTab}
          showLikedTab={userInfo.id === userId}
          handleChangeToOrdersTab={handleChangeToOrdersTab}
          handleChangeToLikedTab={handleChangeToLikedTab}
        />
      </>
    );
  };

  const FooterComponent = () => {
    return (
      loading && <ActivityIndicator style={{ marginTop: 15 }} size="large" />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ProfileHeader
        handleGoToSettings={handleGoToSettings}
        showSettingsIcon={userInfo.id === userId}
      />
      <FlatList
        data={activeTab === 0 ? myOrders : likedOrders}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          activeTab === 0 ? (
            <EmptyOrders
              loading={loading}
              showPostPrompt={userId === userInfo.id}
            />
          ) : (
            <EmptyLikes loading={loading} />
          )
        }
        ListHeaderComponent={HeaderComponent}
        ListFooterComponent={FooterComponent}
        onEndReached={loadMore}
        onEndReachedThreshold={0}
        onRefresh={handleRefresh}
        refreshing={postsCountRefreshing || dripScoreRefreshing || postsRefreshing}
        renderItem={({ item }) => (
          <PostTile
            post={item}
            handleGoToOrdersFeed={handleGoToOrdersFeed}
          />
        )}
      />
    </SafeAreaView>
  );
};


export default ProfileMain;
