import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";
import { Dimensions } from "react-native";
import ImagePickerExample from "./ImagePickerExample";
import { Accelerometer } from "expo-sensors";

const { height, width } = Dimensions.get("window");
const maskRowHeight = Math.round((height - height * 0.961) / 20);
const maskColWidth = (width - width * 0.97) / 2;

export default function CameraExample() {
  const [hasPermission, setHasPermission] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    _subscribe();

    return() =>{
        _unsubscribe()
    }
  }, []);

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  let { x, y, z } = data;
  return (
    <View style={styles.container}>
      <Camera
        ratio="2:1"
        style={[styles.cameraView]}
        type={Camera.Constants.Type.back}
      >
        <View style={styles.maskOutter}>
          <View style={[{ flex: maskRowHeight }, styles.maskRow]} />
          <View style={[{ flex: 30 }, styles.maskCenter]}>
            <View style={styles.maskInner}>
              <ImagePickerExample deg = {round(y)}></ImagePickerExample>
            </View>
          </View>
          <View style={[{ flex: maskRowHeight }, styles.maskRow]} />
        </View>
      </Camera>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
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
    width: "90%",
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
    overflow: "visible",
  },
  maskRow: {
    width: "100%",
  },
  maskCenter: { flexDirection: "row" },
});
