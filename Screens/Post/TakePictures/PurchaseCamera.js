import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Camera } from "expo-camera";
import { Icon } from "react-native-elements";
import * as Haptics from 'expo-haptics';

import { useDispatch, useSelector } from "react-redux";
import { setPostPictures, selectPostInfo } from '../../../Redux/postSlice';

const { width, height } = Dimensions.get('window');

const PurchaseCamera = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef();

  const postInfo = useSelector(selectPostInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const onCameraReady = () => {
    setCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 0.5,
        base64: true,
        skipProcessing: true,
      };
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const data = await cameraRef.current.takePictureAsync(options);
      dispatch(setPostPictures([...postInfo.pictures, data]))
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
        <Camera
          style={styles.camera}
          type={type}
          onCameraReady={onCameraReady}
          ref={cameraRef}
        >
          <TouchableOpacity
            style={styles.switchCamera}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Icon name="repeat" type="material" color="black" size={18} />
          </TouchableOpacity>
          <View style={styles.pictureCount}>
            <Text>{postInfo.pictures.length}</Text>
          </View>
          {cameraReady && (
            <TouchableOpacity
              style={styles.takePictureButton}
              onPress={takePicture}
            >
              <View style={styles.takePictureInnerButton} />
            </TouchableOpacity>
          )}
          {postInfo.pictures.length > 0 && (
            <TouchableOpacity
              style={styles.nextStepButton}
              onPress={() => navigation.navigate('Picture Carousel')}
            >
              <Text>Next</Text>
              <Icon name="navigate-next" type="material" color="black" size={18} />
            </TouchableOpacity>
          )}
        </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    height: height - 80,
  },
  switchCamera: {
    position: "absolute",
    bottom: 30,
    left: 15,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  pictureCount: {
    position: "absolute",
    bottom: 30,
    left: 75,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  takePictureButton: {
    position: "absolute",
    bottom: 15,
    right: width / 2 - 35,
    height: 70,
    width: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  takePictureInnerButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
  },
  nextStepButton: {
    position: "absolute",
    bottom: 30,
    right: 15,
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default PurchaseCamera;
