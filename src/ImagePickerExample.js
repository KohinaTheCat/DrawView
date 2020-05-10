import * as React from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Easing,
  StyleSheet,
  Text,
  Animated,
} from "react-native";
import { Slider } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import styles from "./styles/style_cam";

import {
  State,
  PinchGestureHandler,
  LongPressGestureHandler,
} from "react-native-gesture-handler";

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    opa: 0.5,
    zoom: new Animated.Value(1),
  };

  _zoom = (newValue) => {
    Animated.timing(this.state.zoom, {
      toValue: newValue,
      duration: 300,
    }).start();
  };

  _handleStateChange = ({ nativeEvent }) => {
    if (nativeEvent.scale !== 1) {
      this._zoom(nativeEvent.scale);
    }
  };

  _handleStateChangeLong = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      this.setState({ zoom: new Animated.Value(1) });
    }
  };

  render() {
    let { image } = this.state;
    let degree = (this.props.deg * 90).toString() + "deg";

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={this._pickImage}
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.button_text}>tap to pick an image</Text>
        </TouchableOpacity>

        <LongPressGestureHandler
          onHandlerStateChange={this._handleStateChangeLong}
        >
          <PinchGestureHandler onHandlerStateChange={this._handleStateChange}>
            <Animated.View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                overflow: "visible",
                transform: [{ rotateX: degree }, { translateY: 10 }],
              }}
            >
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 350 * this.state.zoom.__getValue(),
                    height: 500 * this.state.zoom.__getValue(),
                    opacity: this.state.opa,
                  }}
                />
              )}
            </Animated.View>
          </PinchGestureHandler>
        </LongPressGestureHandler>
        <View
          style={{
            alignItems: "stretch",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Slider
            value={this.state.opa}
            thumbStyle={{
              width: 35,
              height: 35,
              backgroundColor: "#e9e1cc",
              borderRadius: 100,
            }}
            trackStyle={{ height: 35 }}
            maximumTrackTintColor="transparent"
            minimumTrackTintColor={"#ea9085"}
            onValueChange={(value) => this.setState({ opa: value })}
          />
          <Text style={styles.slider_text}>
            transparency: {this.state.opa.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [8, 11],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    } catch (E) {
      console.log(E);
    }
  };
}
