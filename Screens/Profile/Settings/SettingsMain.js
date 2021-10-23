import React from "react";
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, clearUser } from "../../../Redux/userSlice";
import { clearCart } from "../../../Redux/cartSlice";

const ProfileMain = ({ navigation }) => {
    const { name } = useSelector(selectUserInfo);
    const dispatch = useDispatch();

    const handleLogoutUser = () => {
        dispatch(clearCart());
        dispatch(clearUser());
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.profileContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Settings</Text>
                    <View style={styles.initialsCircle}>
                        <Text style={styles.initialsText}>
                            {name.split(" ").map(name => {
                                return name[0]
                            })}
                        </Text>
                    </View>
                </View>
                <View style={styles.categoryContainer}>
                    <TouchableOpacity
                        style={styles.category}
                        onPress={() => navigation.navigate('Personal Information')}
                    >
                        <View style={styles.iconCategoryContainer}>
                            <View style={styles.iconContainer}>
                                <Icon name="user" type="font-awesome-5" color="black" size={22} />
                            </View>
                            <Text style={styles.categoryText}>Personal Information</Text>
                        </View>
                        <Icon name="angle-right" type="font-awesome-5" color="black" size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.category}
                        onPress={() => navigation.navigate('Addresses')}
                    >
                        <View style={styles.iconCategoryContainer}>
                            <View style={styles.iconContainer}>
                                <Icon name="home" type="font-awesome-5" color="black" size={22} />
                            </View>
                            <Text style={styles.categoryText}>Addresses</Text>
                        </View>
                        <Icon name="angle-right" type="font-awesome-5" color="black" size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.category}
                        onPress={handleLogoutUser}
                    >
                        <View style={styles.iconCategoryContainer}>
                            <View style={styles.iconContainer}>
                                <Icon name="sign-out-alt" type="font-awesome-5" color="black" size={22} />
                            </View>
                            <Text style={styles.categoryText}>Log Out</Text>
                        </View>
                        <Icon name="angle-right" type="font-awesome-5" color="black" size={22} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
        padding: 20
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    initialsCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },
    initialsText: {
        color: "white",
        fontSize: 24
    },
    header: {
        fontSize: 32,
        fontWeight: "bold"
    },
    categoryContainer: {
        flexDirection: "column",
        justifyContent: "center",
        marginVertical: 20
    },
    category: {
        flexDirection: "row",
        paddingVertical: 20,
        justifyContent: "space-between"
    },
    iconCategoryContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    iconContainer: {
        width: 30,
        height: 30,
        justifyContent: "center"
    },
    categoryText: {
        fontSize: 18,
        marginLeft: 15
    },
})

export default ProfileMain;