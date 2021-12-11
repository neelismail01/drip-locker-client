import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { AWS_BASE_URL } from "../../../util/common";
import { useDispatch } from "react-redux";
import { setAccessToken, setUserInfo } from "../../../Redux/userSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    await AsyncStorage.removeItem("access_token");
    try {
      setLoading(true);
      const response = await axios.post(`${AWS_BASE_URL}users/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        setError("");
        await AsyncStorage.setItem(
          "access_token",
          response.data.body.accessToken
        );
        setLoading(false);
        dispatch(setAccessToken(response.data.body.accessToken));
        dispatch(setUserInfo(response.data.body.userInfo));
      } else {
        setLoading(false);
        setError(response.data.body);
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred while logging in. Please try again.");
      console.log(err);
      console.log("An error occurred while logging in. Please try again.");
    }
  };

  return loading ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="small" />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.formContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.innerContainer}
      >
        <View style={styles.loginForm}>
          <Text style={styles.loginHeader}>Welcome Back</Text>
          <TextInput
            style={styles.textInput}
            name="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.textInput}
            name="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleLogin}
            disabled={email === "" || password === ""}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          {error.length > 0 && <Text style={styles.errorMessage}>{error}</Text>}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    padding: 20,
  },
  loginHeader: {
    fontSize: 36,
    color: "black",
    fontWeight: "bold",
    marginBottom: 40,
  },
  loginForm: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    marginVertical: 10,
    height: 45,
    backgroundColor: "white",
    borderRadius: 7.5,
    borderColor: "grey",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 20,
    fontSize: 14,
  },
  buttonContainer: {
    height: 45,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7.5,
    marginVertical: 30,
    backgroundColor: "black",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  errorMessage: {
    color: "red",
  },
});

export default LoginForm;
