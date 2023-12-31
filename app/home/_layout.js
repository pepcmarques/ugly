import { Stack, useRouter } from "expo-router";

import { useTheme } from "react-native-paper";

const StackLayout = () => {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          display: ["[username]", "tweetComments", "tweetItem"].includes(route.name)
            ? "none"
            : "flex",
        },
        })}
    >
      <Stack.Screen name="[username]" options={{ href:null }}/>
    </Stack>
  );
};

export default StackLayout;
