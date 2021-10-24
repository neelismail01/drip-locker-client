import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

import { useSelector } from 'react-redux';
import { selectUserId } from '../../Redux/userSlice';

const OrdersFilter = ({ activeTab, profileId, handleChangeToOrdersTab, handleChangeToLikedTab }) => {
    const user_id = useSelector(selectUserId);

    return (
        <View style={styles.tabsRow}>
            <TouchableOpacity
                style={[styles.tabContainer, activeTab === 0 && styles.activeTab]}
                onPress={handleChangeToOrdersTab}
            >
                <Icon name="receipt" type="font-awesome-5" color="black" size={18} />
            </TouchableOpacity>
            {
                profileId === user_id &&
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
    }
});

export default OrdersFilter;