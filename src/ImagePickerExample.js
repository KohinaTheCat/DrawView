import * as React from "react";
import { TouchableOpacity, Image, View, StyleSheet, Text } from "react-native";
import { Slider } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import styles from "./styles/style_cam";

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    opa: 0.5,
  };

  render() {
    let { image } = this.state;
    let degree = (this.props.deg * 90).toString() + "deg"

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={this._pickImage}
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.button_text}>tap to pick an image</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
            transform: [
                {rotateX: degree},
                { translateY: 10 }
              ]
          }}
        >
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 350,
                height: 500,
                opacity: this.state.opa,
              }}
            />
          )}
        </View>
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
              width: 40,
              height: 40,
              backgroundColor: "#e9e1cc",
              borderRadius: 100,
            }}
            trackStyle={{ height: 40 }}
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
