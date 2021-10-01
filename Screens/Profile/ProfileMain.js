import React from "react";
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';


import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, clearUser } from "../../Redux/userSlice";
import { clearCart } from "../../Redux/cartSlice";

const ProfileMain = (props) => {
    const { name } = useSelector(selectUserInfo);
    const dispatch = useDispatch();

    const handleLogoutUser = () => {
        dispatch(clearCart());
        dispatch(clearUser());
    }

    return (
        <SafeAreaView style={styles.profileContainer}>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{name.substr(0, name.indexOf(" "))}</Text>
            </View>
            <View style={styles.categoryContainer}>
                <TouchableOpacity
                    style={styles.category}
                    onPress={() => props.navigation.navigate('Personal Information')}
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
                    onPress={() => props.navigation.navigate('Addresses')}
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
        backgroundColor: "white",
        height: "100%",
        width: "100%"
    },
    nameContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20
    },
    name: {
        fontSize: 40,
        fontWeight: "bold"
    },
    categoryContainer: {
        flexDirection: "column",
        justifyContent: "center",
        margin: 20
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