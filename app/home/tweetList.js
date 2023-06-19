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

import { useTheme } from "react-native-paper";

import { getAuthorizationString } from "../../src/services/hooks";

import TweetItem from "./tweetItem";

const apiUrl = Constants.expoConfig.apiUrl;

const TweetList = () => {
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState([]);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const fetchTweets = async () => {
    const authString = await getAuthorizationString();

    const headers = {
      accept: "application/json",
      Authorization: authString,
    };

    try {
      const response = await fetch(apiUrl + "/tweets", {
        method: "GET",
        headers: headers,
      });
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // This is a pattern to not get the error:
    // "useEffect must not return anything besides a function"
    const loadData = async () => {
      setLoading(true);
      const result = await fetchTweets();
      setTweets(result);
      //console.log("----------------");
      //console.log(tweets);
      //console.log("----------------");
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.waiting}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.tweetsView}>
      <FlatList
        data={tweets}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <TweetItem tweet={item} />}
      />
    </View>
  );
};

export default TweetList;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    waiting: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    tweetsView: {
      marginTop: 10,
    },
  });
