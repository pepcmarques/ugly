import { React } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import { useTheme } from "react-native-paper";

import { connect } from "react-redux";

import * as actions from '../../src/store/actions';

const makeStyles = (colors: any) =>
  StyleSheet.create({
    txt: {
      color: colors.primary,
      fontSize: 10,
    },
  });

const SignOut = (props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View>
      <Text style={styles.txt}>{props.authToken}</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          props.signout(props.authToken);          
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    authToken: state.authToken,
  };
};

export default connect(mapStateToProps, actions)(SignOut);
