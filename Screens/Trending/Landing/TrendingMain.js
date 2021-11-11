import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView
} from "react-native";
import { Icon } from "react-native-elements";

const TrendingMain = () => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon name="construction" type="material" color="black" size={48} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.header}>Check back soon!</Text>
                <Text style={styles.subHeader}>
                    This page is currently under development.
                </Text>
            </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    iconContainer: {
        borderWidth: 1,
        borderColor: "black",
        height: 100,
        width: 100,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    textContainer: {
        width: "66%",
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 10
    },
    subHeader: {
        textAlign: "center"
    }
});

export default TrendingMain;