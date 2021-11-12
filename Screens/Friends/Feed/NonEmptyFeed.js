import React from "react";
import { ScrollView } from "react-native";
import OrderCard from '../../../components/FeedCard/OrderCard';

const NonEmptyFeed = ({ friendOrders, navigation, userId }) => {

    return (
        <ScrollView>
            {
                friendOrders.map(order => {
                    return (
                        <OrderCard
                            key={order._id}
                            order={order}
                            liked={order.likedBy.map(like => like.userId).includes(userId)}
                            navigation={navigation}
                        />
                    )
                })
            }
        </ScrollView>
    )
};

export default NonEmptyFeed;