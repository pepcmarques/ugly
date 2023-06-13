import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  FlatList,
  StyleSheet,
} from "react-native";

import { useEffect, useState } from "react";

import Constants from "expo-constants";

import { getAuthorizationString } from "../../src/services/hooks";

const apiUrl = Constants.expoConfig.apiUrl;

const Comments = () => {
  return (
    <View style={styles.tweetsView}>
      <Text>HERE</Text>
      <Text>HERE</Text>
      <Text>HERE</Text>
      <Text>HERE</Text>
      <Text>HERE</Text>
      <Text>HERE</Text>
      <Text>HERE</Text>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  waiting: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  tweetsView: {
    marginTop: 40,
  },
});
