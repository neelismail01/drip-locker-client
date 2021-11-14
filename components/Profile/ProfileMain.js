import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import { BlurView } from "expo-blur";
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

const { width } = Dimensions.get("window");

const ProfileMain = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [dripScore, setDripScore] = useState(null);
  const [numberOfOrders, setNumberOfOrders] = useState(null);
  const [loading, setLoading] = useState(false);

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
    const feedUserId = userId;
    navigation.push("Profile Feed Main", {
      orders,
      order,
      activeTab,
      page,
      feedUserId,
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
    if (activeTab === 0) {
      setMyOrdersPage(myOrdersPage + 1);
    } else {
      setLikedOrdersPage(likedOrdersPage + 1);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (
        (activeTab === 0 && !endMyOrdersReached) ||
        (activeTab === 1 && !endLikedOrdersReached)
      ) {
        setLoading(true);
        const path =
          activeTab === 0
            ? `orders/user/${userId}?limit=${10}&page=${myOrdersPage}`
            : `orders/user/${userId}/liked?limit=${10}&page=${likedOrdersPage}`;
        axios
          .get(`${AWS_BASE_URL}${path}`, config)
          .then((response) => {
            console.log(response.data);
            if (response.data.statusCode === 200) {
              if (activeTab === 0) {
                if (response.data.body.length < 10) {
                  setEndMyOrdersReached(true);
                }
                setMyOrders([...myOrders, ...response.data.body]);
              } else if (activeTab === 1) {
                if (response.data.body.length === 0) {
                  setEndLikedOrdersReached(true);
                }
                setLikedOrders([...likedOrders, ...response.data.body]);
              }
              setLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            console.log("Api call error - getting orders");
          });
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
        });
    }, [])
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
        });
    }, [])
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
    return loading && <ActivityIndicator style={{marginTop: 15}}size="large" />;
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
        numColumns={3}
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
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderCard}
            onPress={() => handleGoToOrdersFeed(item)}
          >
            <Image
              source={{ uri: item.pictureUrls[0] }}
              style={styles.orderCardImage}
            />
            <BlurView intensity={100} style={styles.orderInformation}>
              <Text style={styles.businessName}>{item.brandName}</Text>
            </BlurView>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  orderCard: {
    justifyContent: "center",
  },
  orderCardImage: {
    width: width * 0.33,
    height: width * 0.33,
    borderWidth: 2,
    borderColor: "white",
  },
  orderInformation: {
    width: width * 0.33,
    borderRadius: 5,
    padding: 5,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "white",
  },
  businessName: {
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default ProfileMain;
