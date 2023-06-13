import { Stack, useRouter } from 'expo-router';
import { Button } from 'react-native';

import { useTheme } from "react-native-paper";

const StackLayout = () => {
	const router = useRouter();
    const { colors } = useTheme();

	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: colors.primary,
				},
				headerTintColor: colors.onPrimary,
				headerTitleStyle: {
					fontWeight: 'bold'
				}
			}}
		>
			<Stack.Screen name="tweetList" options={{ headerTitle: 'Tweets', headerShown: true }} />
			<Stack.Screen name="[username]" options={{ headerTitle: 'User Tweets', headerShown: true }} />
		</Stack>
	);
};

export default StackLayout;