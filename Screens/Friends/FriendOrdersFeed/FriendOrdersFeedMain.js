import React, { useState, useRef } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";


import FriendOrderCard from './FriendOrderCard';

const FriendOrdersFeedMain = ({ route }) => {
    const { order, friendOrders } = route.params;
    const scrollRef = useRef();
    const [dataSourceCords, setDataSourceCords] = useState([]);

    const handleLayout = (event, index) => {
        const layout = event.nativeEvent.layout;
        dataSourceCords[index] = layout.y;
        setDataSourceCords(dataSourceCords);
        if (dataSourceCords.indexOf(undefined) === -1) {
            scrollRef.current.scrollTo({
                x: 0,
                y: dataSourceCords[friendOrders.indexOf(order)]
            })
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView ref={scrollRef}>
                {
                    friendOrders.length > 0 &&
                    <View>
                        {
                            friendOrders.map((order, index) => {
                                return (
                                    <View
                                        key={order._id}
                                        onLayout={(event) => handleLayout(event, index)}
                                    >
                                        <FriendOrderCard
                                            order={order}
                                        />
                                    </View>
                                )
                            })
                        }
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
};

export default FriendOrdersFeedMain;