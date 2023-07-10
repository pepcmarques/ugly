import { Stack } from 'expo-router';

import { useTheme } from "react-native-paper";

const StackLayout = () => {
	const router = useRouter();
  const { colors } = useTheme();

	return (
		<Stack>
		</Stack>
	);
};

export default StackLayout;