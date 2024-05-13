import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./login";
import gamePage from "./gamePage";
import securityBreachGame from "./securityBreachGame";

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
					component={gamePage}
					options={{
						headerLeft: null,
						headerTitleAlign: "center",
					}}
				/>
				<Stack.Screen
					name="SecurityBreach"
					component={securityBreachGame}
					options={{
						headerLeft: null,
						headerTitleAlign: "center",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
