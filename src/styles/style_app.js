import { StyleSheet } from "react-native";

export default StyleSheet.create({
    animiationView:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        // backgroundColor: '#000000',
        // opacity: 0.05,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#e9e1cc",
    },
    main_text: {
      bottom: "25%",
    },
    button_text:{
        position: "absolute",
      color: "#ffffff",
      fontSize: 20,
      fontFamily: "roboto",
      padding: 10,
      opacity: 0.9,
    },
    button:{
        backgroundColor: "#ea9085",
        position: "absolute",
        width: "70%",
        alignItems: "center",
        height: 40,
        padding: 200,
        borderRadius: 5000,
        top: "80%",
    },
    title: {
      fontSize: 50,
      textAlign: "center",
      margin: 10,
      fontFamily: "lecker",
      color: "#ea9085",
    },
    description: {
      textAlign: "center",
      marginBottom: 5,
      fontFamily: "roboto",
      color: "#d45079",
    },
  });