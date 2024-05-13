import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function gamePage() {
	const navigation = useNavigation();
	handleSecurityBreach = () => {
		navigation.navigate("SecurityBreach");
	};
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Game Page</Text>
			<Button title="Security Breach" onPress={() => handleSecurityBreach()} />
		</View>
	);
}
