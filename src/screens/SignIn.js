import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import { TextInput as PaperTextInput } from "react-native-paper";

import { useTheme } from "react-native-paper";

import shortid from "shortid";

import { saveToSecureStore } from "../services/hooks.js";

import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../store/actions";

const SignIn = (props) => {
  const dispatch = useDispatch();

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [secure, setSecure] = useState(true);
  const [eye, setEye] = useState("eye");

  const token_id = shortid.generate();

  const formUpdate = (formData) => {};

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.txt}>Ugly</Text>
      </View>
      <View>
        <PaperTextInput
          label="Username"
          value={username}
          onChangeText={(value) => setUsername(value)}
          autoCapitalize="none"
          placeholder={"Enter username or e-mail"}
          style={styles.fieldStyle}
        />
        <PaperTextInput
          label="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          placeholder={"Enter your password"}
          secureTextEntry={secure}
          autoCapitalize="none"
          right={
            <PaperTextInput.Icon
              icon={eye}
              onPress={() => {
                setSecure(!secure);
                if (eye == "eye") {
                  setEye("eye-off");
                } else {
                  setEye("eye");
                }
                return false;
              }}
            />
          }
          style={styles.fieldStyle}
        />
        <View style={styles.links}>
          <Button
            title="Sign In"
            onPress={() => {
              props.signin(username, password);
            }}
          />
          <Button
            title="Register"
            onPress={() => {
              props.signin(username, password);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapStateToProps, actions)(SignIn);

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: 300,
    },

    title: {
      justifyContent: "center",
      alignItems: "center",
    },

    txt: {
      color: colors.primary,
      fontSize: 50,
    },

    fieldStyle: {
      marginTop: 10,
      height: 50,
      borderRadius: 5,
      backgroundColor: colors.onPrimary,
    },

    links: {
      marginTop: 15,
      flexDirection: "row",
      justifyContent: "space-around",
    },
  });
