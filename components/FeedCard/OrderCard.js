import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import axios from 'axios';

import { AWS_BASE_URL } from "@env";
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../Redux/userSlice';

import CardHeader from './CardHeader';
import Caption from './Caption';
import ProductCarousel from './ProductCarousel';
import BrandDetails from './BrandDetails';
import CardFooter from './CardFooter';

const OrderCard = ({ order, liked, navigation }) => {
  const [imageActive, setImageActive] = useState(0);
  const [isLiked, setIsLiked] = useState(liked);

  const accessToken = useSelector(selectAccessToken);

  const handleLikePhoto = async () => {
    const requestData = {
      alreadyLiked: isLiked
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }
    setIsLiked(!isLiked)
    await axios.put(`${AWS_BASE_URL}orders/${order._id}/likes`, requestData, config);
  }

  const handleGoToFriendProfile = (userId, userName) => {
    navigation.push('Profile Main', { userId, userName })
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
      <Caption
        order={order}
      />
      <ProductCarousel
        onchange={onchange}
        order={order}
      />
      <BrandDetails
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

export default OrderCard;