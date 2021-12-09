import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

import { AWS_BASE_URL } from "../../util/common";

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
    const page = activeTab === 0 ? myOrdersPage + 1 : likedOrdersPage + 1;
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

  const getMyPosts = async (isLoading) => {
    const path = `orders/user/${userId}?limit=${10}&page=${myOrdersPage}`;
    axios.get(`${AWS_BASE_URL}${path}`, config)
    .then(response => {
        if (response.data.body.length > 0) {
          if (myOrders.length === 0) {
            setMyOrders([...response.data.body])
          } else if (isLoading) {
            setMyOrders([...myOrders, response.data.body])
          } else if (!isLoading) {
            setMyOrders([...response.data.body])
          }
        }

        if (response.data.body.length < 10) {
          setEndMyOrdersReached(true);
        }
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
      setPostsRefreshing(false);
    })
  }

  const getLikedPosts = async (isLoading) => {
    const path = `orders/user/${userId}/liked?limit=${10}&page=${likedOrdersPage}`;
    axios.get(`${AWS_BASE_URL}${path}`, config)
    .then((response) => {
      if (response.data.body.length > 0) {
        if (likedOrders.length === 0) {
          setLikedOrders([...response.data.body])
        } else if (isLoading) {
          setLikedOrders([...likedOrders, ...response.data.body])
        } else if (!isLoading) {
          setLikedOrders([...response.data.body])
        }
      }

      if (response.data.body.length < 10) {
        setEndLikedOrdersReached(true);
      }
    })
    .catch((err) => {
      console.log("ERROR", err);
      console.log("Api call error - getting orders");
    })
    .finally(() => {
      setLoading(false);
      setPostsRefreshing(false);
    })
  }

  const loadMore = () => {
    if (activeTab === 0 && !endMyOrdersReached) {
      setMyOrdersPage(myOrdersPage + 1);
      setLoading(true);
      getMyPosts(true);
    } else if (activeTab === 1 && !endLikedOrdersReached) {
      setLikedOrdersPage(likedOrdersPage + 1)
      setLoading(true);
      getLikedPosts(true);
    }
  };

  const handleRefresh = () => {
    setDripScoreRefreshing(true);
    setPostsCountRefreshing(true);
    setPostsRefreshing(true);
    if (activeTab === 0) {
      setMyOrdersPage(0);
      setEndMyOrdersReached(false);
      getMyPosts(false);
    } else {
      setLikedOrdersPage(0);
      setEndLikedOrdersReached(false);
      getLikedPosts(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (activeTab === 0 && !endMyOrdersReached) {
        setLoading(true);
        getMyPosts(true);
        setMyOrdersPage(myOrdersPage + 1);
      } else if (activeTab === 1 && !endLikedOrdersReached) {
        setLoading(true);
        getLikedPosts(true);
        setLikedOrdersPage(likedOrdersPage + 1);
      }
    }, [activeTab])
  )


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
      loading && <ActivityIndicator style={{ marginTop: 15 }} size="small" />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ProfileHeader
        handleGoToSettings={handleGoToSettings}
        showSettingsIcon={route.params === undefined}
      />
      <FlatList
        data={activeTab === 0 ? myOrders : likedOrders}
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
