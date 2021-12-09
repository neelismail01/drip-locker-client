import React, { useState, useRef, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserId, selectAccessToken } from '../../Redux/userSlice';
import { AWS_BASE_URL } from '../../util/common';

import FeedCard from './FeedCard';

const FriendFeedMain = ({ route, navigation }) => {
    const { order, orders, page, urlPath } = route.params;
    const userId = useSelector(selectUserId);
    const accessToken = useSelector(selectAccessToken);
    let scrollRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(page)
    const [loadedOrders, setLoadedOrders] = useState(orders);
    const [endReached, setEndReached] = useState(false);

    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
    }

    const loadMore = () => {
        if (!endReached) {
            setLoading(true);
            axios.get(`${AWS_BASE_URL}${urlPath}&page=${currentPage}`, config)
            .then(response => {
                if (response.data.body.length < 10) {
                    setEndReached(true);
                } else {
                    setCurrentPage(currentPage + 1);
                }
                setLoadedOrders([...loadedOrders, ...response.data.body]);
            })
            .catch(err => {
                console.log(err);
                console.log('Api call error - getting orders');
            })
            .finally(() => {
                setLoading(false);
            })
        }
    }

    const renderFooter = () => {
        return (
            loading && <ActivityIndicator size="small" />
        )
    }

    const handleScrollToIndexFailed = (error) => {
        const offset = error.averageItemLength * error.index;
        scrollRef.current.scrollToOffset({ offset });
        setTimeout(() => scrollRef.current.scrollToIndex({ index: error.index }), 100)
    }

    useFocusEffect(
        useCallback(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollToIndex({
                    animated: false,
                    index: loadedOrders.indexOf(order),
                    viewOffset: 0,
                    viewPosition: 0
                })
            }
        }, [])
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <FlatList
                ref={scrollRef}
                data={loadedOrders}
                keyExtractor={item => item._id}
                onEndReached={loadMore}
                onEndReachedThreshold={0}
                onScrollToIndexFailed={handleScrollToIndexFailed}
                ListFooterComponent={renderFooter}
                renderItem={({ item }) => 
                    <FeedCard
                        order={item}
                        liked={item.likedBy.map(like => like.userId).includes(userId)}
                        navigation={navigation}
                    />
                }
            />
        </SafeAreaView>
    )
};

export default FriendFeedMain;