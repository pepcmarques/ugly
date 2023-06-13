import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";

// PaperIcons: https://pictogrammers.com/library/mdi/
// ExpoIcons: https://icons.expo.fyi
import { FontAwesome } from "@expo/vector-icons";

import { useRouter, Link } from "expo-router";

function TweetItem(props) {
  const router = useRouter();
  const tweet = props.tweet;

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
                params: { username: tweet.owner.username },
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

const styles = StyleSheet.create({
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
    color: "blue",
  },

  likes: {
    flexDirection: "row",
    justifyContent: "center",
    //alignItems: "center",
  },

  likesHeart: {
    paddingHorizontal: 5,
  },

  postedBy: {
    paddingBottom: 5,
  },
});
