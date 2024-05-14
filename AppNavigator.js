import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./login";
import GamePage from "./gamePage";
import SecurityBreachGame from "./securityBreachGame";

const Stack = createStackNavigator();

export default function AppNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login">
				<Stack.Screen
					name="Login"
					component={Login}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Games"
					component={GamePage}
					options={{
						headerLeft: null,
						headerTitleAlign: "center",
					}}
				/>
				<Stack.Screen
					name="SecurityBreach"
					component={SecurityBreachGame}
					options={{
						headerLeft: null,
						headerTitleAlign: "center",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
