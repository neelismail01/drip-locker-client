import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

const OrdersFilter = ({ activeTab, showLikedTab, handleChangeToOrdersTab, handleChangeToLikedTab }) => {

    return (
        <View style={styles.tabsRow}>
            <TouchableOpacity
                style={[styles.tabContainer, activeTab === 0 && styles.activeTab, !showLikedTab && styles.fullWidthTab]}
                onPress={handleChangeToOrdersTab}
            >
                <Icon name="photo-camera" type="material" color="black" size={18} />
            </TouchableOpacity>
            {
                showLikedTab &&
                <TouchableOpacity
                    style={[styles.tabContainer, activeTab === 1 && styles.activeTab]}
                    onPress={handleChangeToLikedTab}
                >
                    <Icon name="favorite" type="material" color="black" size={20} />
                </TouchableOpacity>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    tabsRow: {
        width: "100%",
        flexDirection: "row"
    },
    tabContainer: { 
        width: "50%",
        paddingVertical: 10,
        alignItems: "center",
    },
    activeTab: {
        borderBottomWidth: 1,
        borderBottomColor: "grey"
    },
    fullWidthTab: {
        width: "100%",
        borderTopWidth: 1,
        borderTopColor: "grey"
    }
});

export default OrdersFilter;