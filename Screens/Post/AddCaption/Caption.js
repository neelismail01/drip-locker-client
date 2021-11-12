import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { setPostCaption, selectPostInfo } from '../../../Redux/postSlice';


const Caption = ({ navigation }) => {
  const postInfo = useSelector(selectPostInfo)
  const dispatch = useDispatch();
  const [caption, setCaption] = useState(postInfo.caption)

  const handleAddCaption = () => {
    dispatch(setPostCaption(caption));
    navigation.navigate("Purchase Details")
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.captionBody}>
          <Text style={styles.captionHeader}>Caption</Text>
          <Text style={styles.captionHeaderSubtext}>Add a message about this purchase for your friends</Text>
          <TextInput
            placeholder="Add a caption..."
            style={styles.captionInput}
            onChangeText={text => setCaption(text)}
            value={caption}
            multiline
          />
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleAddCaption}
            >
              <Text style={styles.buttonText}>Add Caption</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  captionBody: {
    margin: 20
  },
  captionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  captionHeaderSubtext: {
    fontSize: 13,
    color: "grey",
    marginBottom: 20
  },
  captionInput: {
    
  },
  buttonContainer: {
    height: 45,
    width: "100%",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7.5,
    backgroundColor: "black",
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
});

export default Caption;