import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import axios from 'axios';

import { BASE_URL } from "@env";
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../Redux/userSlice';

import CardHeader from './CardHeader';
import StoreBar from './StoreBar';
import ProductCarousel from './ProductCarousel';
import CardFooter from './CardFooter';

const FriendOrderCard = ({ order, liked, navigation }) => {
  const [imageActive, setImageActive] = useState(0);
  const [isLiked, setIsLiked] = useState(liked);

  const userId = useSelector(selectUserId);

  const handleLikePhoto = async () => {
    setIsLiked(!isLiked)
    await axios.put(`${BASE_URL}orders/like/${order._id}`, { userId })
  }

  const handleGoToFriendProfile = (friendUserId, friendName) => {
    navigation.navigate('Friend Profile Main', { friendUserId, friendName })
  }
  
  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide !== imageActive) {
        setImageActive(slide);
      }
    }
  }

  return (
    <View style={styles.friendOrdersContainer}>
      <CardHeader
        order={order}
        handleGoToFriendProfile={handleGoToFriendProfile}
      />
      <StoreBar
        order={order}
      />
      <ProductCarousel
        onchange={onchange}
        order={order}
      />
      <CardFooter
        order={order}
        isLiked={isLiked}
        imageActive={imageActive}
        handleLikePhoto={handleLikePhoto}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  friendOrdersContainer: {
    width: "100%",
    backgroundColor: "white",
    marginVertical: 25
  }
});

export default FriendOrderCard;