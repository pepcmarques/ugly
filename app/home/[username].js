import { View, Text } from "react-native";

import { usePathname } from "expo-router";

const UserTweets = () => {
  const pathname = usePathname();

  return (
    <View style={{flex: 1, alignItems: "center", justifyContent:"center"}}>
      <Text>Paulo</Text>
    </View>
  );
};

export default UserTweets;
