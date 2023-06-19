import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";

// PaperIcons: https://pictogrammers.com/library/mdi/
// ExpoIcons: https://icons.expo.fyi
import { FontAwesome } from "@expo/vector-icons";

import { useTheme } from "react-native-paper";

import { useRouter, Link } from "expo-router";

function TweetItem(props) {
  const router = useRouter();
  const tweet = props.tweet;

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  console.log(tweet);

  const likes = tweet.likes.length;
  const comments = tweet.comments.length;

  const handlePress = () => {
    router.push("/home/comments");
  };

  let heart = "heart-o";
  if (likes > 0) {
    heart = "heart";
  }

  return (
    <TouchableOpacity style={styles.tweet} onPress={handlePress}>
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
        <View style={styles.links}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.postedBy}>posted by: </Text>
            <Link
              style={styles.link}
              href={{
                pathname: `/home/${tweet.owner.username}`, // TODO: Change route
                params: { username: tweet.owner.username, user_id: tweet.user_id },
              }}
            >
              {tweet.owner.username}
            </Link>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>comments: </Text>
            <Link
              style={styles.link}
              href={{
                pathname: "/home/tweetList", // TODO: Change route
                params: { user_id: tweet.user_id },
              }}
            >
              {comments}
            </Link>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default TweetItem;

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
