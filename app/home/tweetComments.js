import { useState } from "react";

import {
  Alert,
  FlatList,
  View,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";

// PaperIcons: https://pictogrammers.com/library/mdi/
// ExpoIcons: https://icons.expo.fyi
import { FontAwesome } from "@expo/vector-icons";

import {
  useTheme,
  TextInput as PaperTextInput,
  Button as PaperButton,
} from "react-native-paper";

import { useRouter, Link, Redirect } from "expo-router";
import { getAuthorizationString } from "../../src/services/hooks";

import Constants from "expo-constants";
const apiUrl = Constants.expoConfig.apiUrl;

import shortid from "shortid";

function TweetComments(props) {
  const router = useRouter();
  const tweet = props.tweet;

  console.log(tweet);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [comment, setComment] = useState("");

  const likes = tweet.likes.length;
  const comments = tweet.comments.length;

  const handlePress = async () => {
    if (comment.length < 5) {
      Alert.alert("Comments must have more than 5 characters");
    } else {
      const authString = await getAuthorizationString();
      const headers = {
        accept: "application/json",
        Authorization: authString,
        "Content-Type": "application/json",
      };
      try {
        const url = apiUrl + "/tweets/" + tweet.id + "/comments";
        console.log(url);
        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ content: comment }),
        });
      } catch (error) {
        console.error(error);
      }
      tweet.comments = [
              ...tweet.comments,
              { id: shortid.generate(), content: comment, user_id: "me" },
            ];
      setComment("");
      <Redirect href="#" params={{ props: tweet }} />
    }
  };

  let heart = "heart-o";
  if (likes > 0) {
    heart = "heart";
  }

  return (
    <ScrollView style={styles.tweet} onPress={handlePress}>
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Text>posted by: </Text>
        <Text style={styles.user_name}>{tweet.owner.username}</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.title}>{tweet.content}</Text>
          <View style={styles.likes}>
            <FontAwesome
              style={styles.likesHeart}
              name={heart}
              size={24}
              color="red"
            />
            <Text>{likes}</Text>
          </View>
        </View>
      </View>
      <View>
        <FlatList
          data={tweet.comments}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <View style={styles.cardComment}>
              <Text>commented by: {item.user_id}</Text>
              <Text style={styles.comment}>{item.content}</Text>
            </View>
          )}
        />
      </View>
      <View>
        <PaperTextInput
          label="Comment"
          value={comment}
          onChangeText={setComment}
          placeholder={"Insert your comment here"}
          style={{ width: 350 }}
        />
      </View>
      <PaperButton
        style={styles.addButton}
        icon="plus"
        mode="contained"
        onPress={handlePress}
      >
        Add comment
      </PaperButton>
    </ScrollView>
  );
}

export default TweetComments;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    user_name: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.primary,
    },

    tweet: {
      marginTop: 12,
    },

    card: {
      width: 350,
      backgroundColor: "#fff",
      borderColor: "#bbb",
      borderWidth: 1,
      borderTopWidth: 0,
    },

    cardComment: {
      padding: 5,
      margin: 10,
      width: 340,
      backgroundColor: colors.background,
      borderColor: colors.primary,
      borderWidth: 1,
      borderTopWidth: 0,
      borderRightWidth: 0,
    },

    comment: {
      padding: 5,
      fontSize: 14,
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

    likes: {
      flexDirection: "row",
      justifyContent: "center",
    },

    likesHeart: {
      paddingHorizontal: 5,
    },

    addButton: {
      marginHorizontal: 100,
      marginTop: 10,
    },
  });
