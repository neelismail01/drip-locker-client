import React, { useState, useRef } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import axios from 'axios';

import { BASE_URL } from "@env";
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../Redux/userSlice';

import OrderCard from '../../../components/FeedCard/OrderCard';

const OrdersFeedMain = ({ route }) => {
    const { order, orders } = route.params;
    const scrollRef = useRef();
    const [dataSourceCords, setDataSourceCords] = useState([]);

    const userId = useSelector(selectUserId);

    const handleLayout = (event, index) => {
        const layout = event.nativeEvent.layout;
        dataSourceCords[index] = layout.y;
        setDataSourceCords(dataSourceCords);
        if (dataSourceCords.indexOf(undefined) === -1) {
            scrollRef.current.scrollTo({
                x: 0,
                y: dataSourceCords[orders.indexOf(order)]
            })
        }
    }

    const handleLikePhoto = async (orderId) => {
        await axios.put(`${BASE_URL}orders/like/${orderId}`, { userId })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView ref={scrollRef}>
                {
                    orders.map((order, index) => {
                        return (
                            <View
                                key={order._id}
                                onLayout={(event) => handleLayout(event, index)}
                            >
                                <OrderCard
                                    order={order}
                                    liked={order.likedBy.includes(userId)}
                                    handleLikePhoto={handleLikePhoto}
                                />
                            </View>
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
};

export default OrdersFeedMain;