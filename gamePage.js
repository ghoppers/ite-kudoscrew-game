import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function gamePage() {
	const navigation = useNavigation();
	const route = useRoute();
	const { playerName } = route.params; // Get playerName from the parameters

	const handleSecurityBreach = () => {
		navigation.navigate("SecurityBreach", { playerName }); // Pass playerName to SecurityBreach
	};

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Game Page</Text>
			<Button title="Security Breach" onPress={handleSecurityBreach} />
		</View>
	);
}
