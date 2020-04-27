import { StyleSheet } from "react-native";

export default StyleSheet.create({
    slider_text:{
        color: "#ffffff",
        shadowColor: "#000000",
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 10,
        fontSize: 15,
        padding: 5,
        fontFamily: "roboto"
    },
    button_text:{
      position: "absolute",
      color: "#ffffff",
      fontSize: 20,
      fontFamily: "roboto",
      padding: 10,
      opacity: 0.9,
      bottom: 10,
    },
    button:{
        backgroundColor: "#ea9085",
        position: "absolute",
        width: "50%",
        alignItems: "center",
        height: 10,
        padding: 100,
        borderRadius: 5000,
        bottom: "90%",
    },
});