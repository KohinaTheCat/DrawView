import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";
import { Dimensions } from "react-native";
import ImagePickerExample from "./ImagePickerExample"

const { height, width } = Dimensions.get("window");
const maskRowHeight = Math.round((height - height * 0.95) / 20);
const maskColWidth = (width - width * 0.95) / 2;

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
      <Camera style={styles.cameraView} type={Camera.Constants.Type.back}>
        <View style={styles.maskOutter}>
          <View
            style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]}
          />
          <View style={[{ flex: 30 }, styles.maskCenter]}>
            <View style={[{ width: maskColWidth }, styles.maskFrame]} />
            <View style={styles.maskInner}>
                <ImagePickerExample></ImagePickerExample>
            </View>
            <View style={[{ width: maskColWidth }, styles.maskFrame]} />
          </View>
          <View
            style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]}
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
    justifyContent: "flex-start",
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
    width: 300,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: "rgba(1,1,1,0.6)",
  },
  maskRow: {
    width: "100%",
  },
  maskCenter: { flexDirection: "row" },
});
