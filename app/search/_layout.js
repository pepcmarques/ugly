import { Stack, useRouter } from "expo-router";

import { useTheme } from "react-native-paper";

const StackLayout = () => {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={({ route }) => ({
        headerShown: false,
        })}
    ></Stack>
  );
};

export default StackLayout;
