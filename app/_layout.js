import { Tabs, useRouter } from "expo-router";
import { Button } from "react-native";

import { useTheme } from "react-native-paper";

import { FontAwesome } from "@expo/vector-icons";

const TabLayout = () => {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.onPrimary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarStyle: {
          display: ["index", "auth", "UglyGlobal"].includes(route.name)
            ? "none"
            : "flex",
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{ headerTitle: "Index", headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="auth"
        options={{
          headerTitle: "Authentication",
          headerShown: false,
          href: null,
        }}
      />
      <Tabs.Screen
        name="UglyGlobal"
        options={{ headerTitle: "UglyGlobal", headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Tweets",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{ headerTitle: "Search", headerShown: true, tabBarIcon: ({ color }) => (
          <FontAwesome name="search" size={24} color={color} />
        ), }}
      />
    </Tabs>
  );
};

export default TabLayout;
