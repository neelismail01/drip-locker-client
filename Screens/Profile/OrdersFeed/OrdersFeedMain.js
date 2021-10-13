import React, { useState, useRef } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";


import OrderCard from './OrderCard';

const OrdersFeedMain = ({ route }) => {
    const { order, orders } = route.params;
    const scrollRef = useRef();
    const [dataSourceCords, setDataSourceCords] = useState([]);

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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView
                ref={scrollRef}
            >
                {
                    orders.length > 0 &&
                    <View>
                        {
                            orders.map((order, index) => {
                                return (
                                    <View
                                        key={order._id}
                                        onLayout={(event) => handleLayout(event, index)}
                                    >
                                        <OrderCard
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

export default OrdersFeedMain;