import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { Icon } from "react-native-elements";
import * as Haptics from 'expo-haptics';

import { useSelector, useDispatch } from "react-redux";
import { setPostPictures, selectPostInfo } from '../../../Redux/postSlice';

const { width } = Dimensions.get('window');

const PictureCarousel = ({ navigation }) => {

  const postInfo = useSelector(selectPostInfo);
  const dispatch = useDispatch();

  const deletePicture = (pictureToDelete) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(setPostPictures(postInfo.pictures.filter(picture => picture !== pictureToDelete)));
    if (postInfo.pictures.length === 1) {
        navigation.navigate('Purchase Camera');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.container}>
            <Text style={styles.header}>How do your pictures look?</Text>
            <ScrollView
                horizontal
                snapToInterval={width}
                snapToAlignment={"center"}
                decelerationRate={0}
                showsHorizontalScrollIndicator={false}
            >
                {
                    postInfo.pictures.map((picture, index) => {
                        return (
                            <View key={index} style={styles.pictureContainer}>
                                <ImageBackground
                                    source={{
                                        uri: picture.uri
                                    }}
                                    style={styles.picture}
                                >
                                    <TouchableOpacity
                                        style={styles.deletePictureButton}
                                        onPress={() => deletePicture(picture)}
                                    >
                                        <Icon name="close" type="material" color="black" size={18} />
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                        )
                    })
                }
            </ScrollView>
            <TouchableOpacity
                style={styles.retakeButton}
                onPress={() => navigation.navigate('Purchase Camera')}
            >
                <View style={styles.retakeButtonInnerContainer}>
                    <Icon name="navigate-before" type="material" color="black" size={18} />
                    <Text style={styles.retakeButtonText}>Retake</Text>
                </View>
            </TouchableOpacity>
            <View style={{ alignItems: "center", width: "100%", paddingHorizontal: 20 }}>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => navigation.navigate('Purchase Details')}
                >
                    <Text style={styles.buttonText}>Looks Good!</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pictureContainer: {
    width: width,
    justifyContent: "center"
  },
  picture: {
    height: width - 40,
    width: width - 40,
    marginHorizontal: 20,
    marginVertical: 10
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20
  },
  deletePictureButton: {
    position: "absolute",
    height: 25,
    width: 25,
    borderRadius: 12.5,
    top: -10,
    right: -10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efefef",
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 7
  },
  retakeButton: {
      alignSelf: "flex-start",
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 5,
      marginLeft: 20,
      marginTop: 15,
      marginBottom: 30,
      justifyContent: "center",
      alignItems: "center"
  },
  retakeButtonInnerContainer: {
    padding: 5,
    flexDirection: "row"
  },
  retakeButtonText: {
      marginLeft: 2.5
  },
  buttonContainer: {
    height: 45,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7.5,
    backgroundColor: "black",
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 7
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
});

export default PictureCarousel;