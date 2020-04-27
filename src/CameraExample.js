import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";
import { Dimensions } from "react-native";
import ImagePickerExample from "./ImagePickerExample"

const { height, width } = Dimensions.get("window");
const maskRowHeight = Math.round((height - height * 0.961) / 20);
const maskColWidth = (width - width * 0.97) / 2;

export default function CameraExample() {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera ratio = "2:1" style={[styles.cameraView, ]} type={Camera.Constants.Type.back}>
        <View style={styles.maskOutter}>
          <View
            style={[{ flex: maskRowHeight }, styles.maskRow]}
          />
          <View style={[{ flex: 30 }, styles.maskCenter]}>
            <View style={styles.maskInner}>
                <ImagePickerExample></ImagePickerExample>
            </View>
          </View>
          <View
            style={[{ flex: maskRowHeight }, styles.maskRow]}
          />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
    // justifyContent: "flex-start",
  },
  maskOutter: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  maskInner: {
    width: '90%',
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
    overflow: "visible"
  },
  maskRow: {
    width: "100%",
  },
  maskCenter: { flexDirection: "row" },
});
