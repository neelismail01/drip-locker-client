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
import { Icon } from "react-native-elements";

import { useSelector, useDispatch } from "react-redux";
import { setProductTags, selectPostInfo } from '../../../Redux/postSlice';


const ProductTagging = ({ navigation }) => {
  const postInfo = useSelector(selectPostInfo);
  const [tags, setTags] = useState(postInfo.productTags);
  const [newTag, setNewTag] = useState('');
  const [toggleShowTagInput, setToggleShowTagInput] = useState(false);
  const dispatch = useDispatch();

  const handleAddTag = () => {
    setTags([...tags, newTag]);
    setNewTag('');
    setToggleShowTagInput(false);
  }

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  }

  const handleSubmitTags = () => {
    dispatch(setProductTags(tags));
    navigation.navigate('Purchase Details');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={styles.tagBody}>
          <Text style={styles.tagHeader}>Product Tags</Text>
          <Text style={styles.tagHeaderSubtext}>Help make your purchases discoverable to friends</Text>
          <View style={styles.tagsEditor}>
            {
              tags.map((tag, index) => {
                return (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                    <TouchableOpacity onPress={() => handleDeleteTag(tag)}>
                      <Icon name="clear" type="material" color="white" size={14} />
                    </TouchableOpacity>
                  </View>
                )
              })
            }
            {
              toggleShowTagInput && tags.length < 10 ?
              <TextInput
                placeholder="Add tag..."
                autoFocus={toggleShowTagInput}
                value={newTag}
                onChangeText={text => setNewTag(text)}
                onSubmitEditing={handleAddTag}
                returnKeyType="done"
              /> :
              <TouchableOpacity onPress={() => setToggleShowTagInput(true)}>
                <Text style={styles.addTagButton}>+ ADD</Text>
              </TouchableOpacity>
            }
          </View>
          <View style={{ alignItems: "center", width: "100%" }}>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleSubmitTags}
            >
                <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tagBody: {
    margin: 20
  },
  tagHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  tagHeaderSubtext: {
    fontSize: 13,
    color: "grey",
    marginBottom: 20
  },
  tagsEditor: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  addTagButton: {
    fontWeight: "bold",
    fontSize: 14
  },
  tag: {
    borderRadius: 20,
    alignSelf: "flex-start",
    backgroundColor: "black",
    marginRight: 10,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10
  },
  tagText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    marginRight: 5
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

export default ProductTagging;