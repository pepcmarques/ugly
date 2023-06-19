import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet,
} from "react-native";

import { usePathname, useSearchParams } from "expo-router";

import { getAuthorizationString } from "../../src/services/hooks";

import { useTheme } from "react-native-paper";

import TweetComments from "./tweetComments";

import Constants from "expo-constants";

const apiUrl = Constants.expoConfig.apiUrl;

const UserTweets = () => {
  const pathname = usePathname();
  const { username, user_id } = useSearchParams();

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [loading, setLoading] = useState(true);
  const [userTweets, setUserTweets] = useState([]);

  const fetchUserTweets = async () => {
    const authString = await getAuthorizationString();

    const headers = {
      accept: "application/json",
      Authorization: authString,
    };

    try {
      const response = await fetch(apiUrl + `/tweets/${user_id}`, {
        method: "GET",
        headers: headers,
      });
      const responseJson = await response.json();
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
      const result = await fetchUserTweets();
      setUserTweets(result);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        data={userTweets}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <TweetComments tweet={item} />}
      />
    </View>
  );
};

export default UserTweets;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    tweet: {
      marginHorizontal: 12,
      marginTop: 12,
    },

    card: {
      backgroundColor: "#fff",
      borderColor: "#bbb",
      borderWidth: 1,
      borderTopWidth: 0,
    },

    info: {
      flexDirection: "row",
      padding: 10,
    },

    title: {
      flex: 1,
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
    },

    links: {
      flexDirection: "row",
      marginHorizontal: 12,
      justifyContent: "space-between",
    },

    link: {
      color: colors.primary,
      fontWeight: "bold",
    },

    likes: {
      flexDirection: "row",
      justifyContent: "center",
    },

    likesHeart: {
      paddingHorizontal: 5,
    },

    postedBy: {
      paddingBottom: 5,
    },
  });
