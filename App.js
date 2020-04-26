import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import ImagePickerExample from "./src/ImagePickerExample";
import CameraExample from "./src/CameraExample";

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});
//platform specific display message

export default function App() {
  return (
    <>
      {/* <ImagePickerExample></ImagePickerExample>   */}
      <CameraExample></CameraExample>
    </>
  );
}

const styles = StyleSheet.create({
  holder: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  front:{
      zIndex: 10,
  },
  pane: {
    width: 100,
    height: 100,
    marginRight: "50%",
    backgroundColor: "#acfae5",
    borderRadius: 30,
    textAlign: "center",
    overflow: "hidden",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});
