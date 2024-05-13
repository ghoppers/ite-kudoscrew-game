import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Image,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
	Platform,
} from "react-native";
import {
	Container,
	Content,
	Form,
	Item,
	Input,
	Button,
	Text,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
	const navigation = useNavigation();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const isValidEmail = (email) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};

	const handleSubmit = () => {
		if (!name || !email) {
			alert("Error: Both fields must be filled!");
			return;
		} else if (!isValidEmail(email)) {
			alert("Error: Please enter a valid email!");
			return;
		} else {
			console.log("Name: ", name);
			console.log("Email: ", email);
			navigation.navigate("Games");
		}
	};

	return (
		<Container style={styles.container}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios"}
				style={styles.container}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<Content contentContainerStyle={styles.content}>
						<Image
							source={require("./assets/logo.png")}
							style={styles.logo}
							resizeMode="contain"
						/>
						<Form style={styles.form}>
							<Item regular style={styles.inputItem}>
								<Input
									placeholder="Name"
									style={styles.input}
									value={name}
									onChangeText={(text) => setName(text)}
								/>
							</Item>
							<Item regular style={styles.inputItem}>
								<Input
									placeholder="Email"
									style={styles.input}
									value={email}
									onChangeText={(text) => setEmail(text)}
								/>
							</Item>
							<Button block style={styles.button} onPress={handleSubmit}>
								<Text>Start</Text>
							</Button>
						</Form>
					</Content>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	logo: {
		height: 80,
		marginBottom: 20,
	},
	form: {
		width: "100%",
	},
	inputItem: {
		marginBottom: 10,
	},
	input: {
		backgroundColor: "#f0f0f0",
		borderRadius: 5,
	},
	button: {
		marginTop: 20,
		backgroundColor: "#007bff",
	},
});
