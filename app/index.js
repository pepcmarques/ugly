import { StatusBar } from "expo-status-bar";

import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useColorScheme } from "react-native";

import {
  Colors,
  MD3LightTheme,
  MD3DarkTheme,
  ProgressBar,
  Provider as PaperProvider,
} from "react-native-paper";

const lightMainColors = {
  colors: {
    primary: "rgb(0, 103, 130)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(187, 233, 255)",
    onPrimaryContainer: "rgb(0, 31, 41)",
    secondary: "rgb(76, 97, 107)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(207, 230, 242)",
    onSecondaryContainer: "rgb(8, 30, 39)",
    tertiary: "rgb(92, 91, 125)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(226, 223, 255)",
    onTertiaryContainer: "rgb(25, 24, 55)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(251, 252, 254)",
    onBackground: "rgb(25, 28, 30)",
    surface: "rgb(251, 252, 254)",
    onSurface: "rgb(25, 28, 30)",
    surfaceVariant: "rgb(220, 228, 233)",
    onSurfaceVariant: "rgb(64, 72, 76)",
    outline: "rgb(112, 120, 125)",
    outlineVariant: "rgb(192, 200, 204)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(46, 49, 50)",
    inverseOnSurface: "rgb(239, 241, 243)",
    inversePrimary: "rgb(97, 212, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(238, 245, 248)",
      level2: "rgb(231, 240, 244)",
      level3: "rgb(223, 236, 240)",
      level4: "rgb(221, 234, 239)",
      level5: "rgb(216, 231, 237)",
    },
    surfaceDisabled: "rgba(25, 28, 30, 0.12)",
    onSurfaceDisabled: "rgba(25, 28, 30, 0.38)",
    backdrop: "rgba(42, 50, 53, 0.4)",
  },
};

const darkMainColors = {
  colors: {
    primary: "rgb(97, 212, 255)",
    onPrimary: "rgb(0, 53, 69)",
    primaryContainer: "rgb(0, 77, 99)",
    onPrimaryContainer: "rgb(187, 233, 255)",
    secondary: "rgb(180, 202, 213)",
    onSecondary: "rgb(30, 51, 60)",
    secondaryContainer: "rgb(53, 74, 83)",
    onSecondaryContainer: "rgb(207, 230, 242)",
    tertiary: "rgb(197, 195, 234)",
    onTertiary: "rgb(46, 45, 77)",
    tertiaryContainer: "rgb(68, 67, 100)",
    onTertiaryContainer: "rgb(226, 223, 255)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(25, 28, 30)",
    onBackground: "rgb(225, 227, 228)",
    surface: "rgb(25, 28, 30)",
    onSurface: "rgb(225, 227, 228)",
    surfaceVariant: "rgb(64, 72, 76)",
    onSurfaceVariant: "rgb(192, 200, 204)",
    outline: "rgb(138, 146, 150)",
    outlineVariant: "rgb(64, 72, 76)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(225, 227, 228)",
    inverseOnSurface: "rgb(46, 49, 50)",
    inversePrimary: "rgb(0, 103, 130)",
    elevation: {
      level0: "transparent",
      level1: "rgb(29, 37, 41)",
      level2: "rgb(31, 43, 48)",
      level3: "rgb(33, 48, 55)",
      level4: "rgb(34, 50, 57)",
      level5: "rgb(35, 54, 62)",
    },
    surfaceDisabled: "rgba(225, 227, 228, 0.12)",
    onSurfaceDisabled: "rgba(225, 227, 228, 0.38)",
    backdrop: "rgba(42, 50, 53, 0.4)",
  },
};

const lightTheme = {
  ...MD3LightTheme,
  ...lightMainColors,
};

const darkTheme = {
  ...MD3DarkTheme,
  ...darkMainColors,
};

import { Provider as ReduxProvider } from "react-redux";

import { useRouter } from "expo-router";

import MobileRepository from "../src/components/MobRepo";

import store from "../src/store/store";

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme == "dark" ? darkTheme : lightTheme;

  const navigation = useRouter();

  return (
    <PaperProvider theme={theme}>
      <ReduxProvider store={store}>
        <SafeAreaView style={styles.container}>
          <StatusBar style="light" />
          <MobileRepository />
        </SafeAreaView>
      </ReduxProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fed",
  },
});
