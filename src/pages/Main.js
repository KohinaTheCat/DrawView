import React, { Component } from "react";
import {NavigationContainer} from '@react-navigation/native';

import {
  Easing,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";

import CameraExample from '../CameraExample'
import styles from "../styles/style_app.js"
import * as Font from "expo-font";
import { AppLoading } from "expo";


let customFonts = {
  roboto: require("../fonts/RobotoCondensed-Bold.ttf"),
  lecker: require("../fonts/LeckerliOne-Regular.ttf"),
  allura: require("../fonts/Allura-Regular.ttf"),
};

export default class Main extends Component {
  state = {
    fontsLoaded: false,
    yValue: new Animated.Value(-1000),
    xValue: new Animated.Value(0),
    height: new Animated.Value(0),
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this._moveAnimation();
  }

  _moveAnimation = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.xValue, {
            toValue: 300,
            duration: 500,
            asing: Easing.elastic,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.yValue, {
            toValue: 50,
            duration: 500,
            asing: Easing.elastic,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(this.state.xValue, {
            toValue: 0,
            duration: 2000,
            easing: Easing.bounce,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.yValue, {
            toValue: -100,
            duration: 2000,
            easing: Easing.bounce,
            useNativeDriver: true,
          }),
        ]),
      ]),
      Animated.timing(this.state.height, {
        toValue: 1,
        duration: 3000,
        easing: Easing.elastic(10),
      }),
    ]).start();
  };

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    translateX: this.state.xValue,
                    translateY: this.state.yValue,
                  },
                ],
              },
            ]}
          >
            <View style={styles.main_text}>
              <Text style={styles.title}>DrawView</Text>
              <Text style={styles.description}>
                keeping you on track with your drawing references
              </Text>
            </View>
          </Animated.View>

          <TouchableOpacity
            style={[
              styles.button,
              { transform: [{ scaleY: this.state.height }] },
            ]}
            activeOpacity={0.7}
            onPress={() => this.props.navigation.navigate('Camera')}
          >
            <Text style={[styles.button_text]}>start</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
}
