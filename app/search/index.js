import { View, Text } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const index = () => {
  router = useRouter();
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default index;
