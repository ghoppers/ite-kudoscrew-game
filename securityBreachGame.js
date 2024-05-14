import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { Container, Content, Button as NativeButton } from "native-base";
import { useNavigation } from "@react-navigation/native";

const SecurityBreachGame = ({ route }) => {
	const { playerName } = route.params;
	const navigation = useNavigation();

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [scoreHistory, setScoreHistory] = useState([]);
	const [leaderboard, setLeaderboard] = useState([]);

	const questions = [
		{
			question:
				"Your character is a Manager trying to identify a cyber security breach. Which action would best describe you?",
			choices: [
				"You would first evaluate the severity of the breach, considering how it affects the employees, data, systems and company.",
				"You are intrigued by the breach and dig deep, exploring unconventional angles and seeking patterns on how the hackers breached the system.",
			],
			answer: 1, // Index of correct answer in choices array
		},
		{
			question:
				"<i>&quot;We want $$ or me delete everything your system.&quot;</i><br>When you read the hacker's message above, you...",
			choices: [
				"You laughed at the silly and poor language used.",
				"You read it carefully, analyzing the message.",
			],
			answer: 0,
		},
		{
			question:
				"As you inspected the cyber security breach, your next action would be to...",
			choices: [
				"follow established protocols, notifying the relevant parties and initiating incident response plans.",
				"challenge existing security protocols, propose solutions, perhaps even turning the breach into an opportunity.",
			],
			answer: 1,
		},
		{
			question:
				"When you stumbled upon a meeting room door ajar, what would you do?",
			choices: [
				"You peeked inside, curious about the chaos. Disorder can be fascinating.",
				"You immediately closed it, ensuring everything was back in its place.",
			],
			answer: 0,
		},
		{
			question:
				"Before leaving the office, you scanned the office, describe what do you see?",
			choices: [
				"A neat and tidy office with photographs in a similar theme of décor.",
				"An inviting office distributed with items of memorabilia.",
			],
			answer: 1,
		},
	];

	const checkAnswer = (choice) => {
		if (choice === questions[currentQuestion].answer) {
			setScore(score + 7);
		} else {
			setScore(score + 5);
		}
		setCurrentQuestion(currentQuestion + 1);

		if (currentQuestion + 1 === questions.length) {
			console.log("End of game reached.");
			console.log(score);
			endGame();
		}
	};

	const submitScore = async () => {
		try {
			console.log("Submitting score...");
			console.log(JSON.stringify({ name: playerName, score }));
			const response = await fetch("https://darrow.owo.sg/api/submitScore", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: playerName, score }),
			});
			console.log("Response:", response);
			if (!response.ok) {
				const errorData = await response.json(); // Parse error response body as JSON
				throw new Error(errorData.error || "Failed to submit score"); // Throw error message from response body
			}
			const data = await response.json();
			console.log("Score submitted successfully:", data);
		} catch (error) {
			console.error("Error submitting score:", error);
		}
	};

	const fetchLeaderboard = async () => {
		try {
			const response = await fetch("https://darrow.owo.sg/api/getScores");
			console.log("Response:", response);
			if (!response.ok) {
				throw new Error("Failed to fetch leaderboard");
			}
			const leaderboard = await response.json();
			setLeaderboard(leaderboard);
			console.log("Leaderboard fetched successfully:", leaderboard);
		} catch (error) {
			console.error("Error fetching leaderboard:", error);
		}
	};

	const endGame = async () => {
		console.log("Ending game...");
		const playerScore = { name: playerName, score };
		const updatedScoreHistory = [...scoreHistory, playerScore];
		updatedScoreHistory.sort((a, b) => b.score - a.score); // Sort in descending order of score
		setScoreHistory(updatedScoreHistory);
		await submitScore();
		await fetchLeaderboard();
		console.log("Game ended.");
	};

	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<Container>
			<ScrollView contentContainerStyle={styles.content}>
				{currentQuestion < questions.length ? (
					<>
						<View style={styles.content}>
							<Text style={styles.questionText}>
								{questions[currentQuestion].question}
							</Text>
							{questions[currentQuestion].choices.map((choice, index) => (
								<TouchableOpacity
									key={index}
									style={styles.choiceButton}
									onPress={() => checkAnswer(index)}
								>
									<Text style={styles.buttonText}>{choice}</Text>
								</TouchableOpacity>
							))}
						</View>
					</>
				) : (
					<View style={styles.questionContainer}>
						<Text>Thank you for participating in our game.</Text>
						<Text>Your final score is: {score - 5}</Text>
						{leaderboard.length > 0 && (
							<View style={styles.leaderboardContainer}>
								<Text style={styles.leaderboardTitle}>Leaderboard</Text>
								{leaderboard.slice(0, 5).map((entry, index) => (
									<Text key={index} style={styles.leaderboardEntry}>
										{index + 1}. {entry.name}: {entry.score}
									</Text>
								))}
							</View>
						)}
						<NativeButton style={styles.backButton} onPress={handleBack}>
							<Text style={styles.buttonText}>Back</Text>
						</NativeButton>
					</View>
				)}
				{scoreHistory.length > 0 && (
					<View style={styles.scoreHistoryContainer}>
						<Text style={styles.scoreHistoryTitle}>Score History</Text>
						{scoreHistory.map((entry, index) => (
							<Text key={index} style={styles.scoreHistoryEntry}>
								{index + 1}. {entry.name}: {entry.score}
							</Text>
						))}
					</View>
				)}
			</ScrollView>
		</Container>
	);
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000000",
	},
	content: {
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	buttonText: {
		color: "white",
		textAlign: "center",
		paddingHorizontal: 10,
		paddingVertical: 5,
		fontSize: 16,
		justifyContent: "center",
		flex: 1,
	},
	choiceButton: {
		marginBottom: 10,
		backgroundColor: "#007bff",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		width: "100%", // Ensure button takes full width
	},
	questionContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "rgba(255, 255, 255, 0.7)",
		marginBottom: 20,
	},
	questionText: {
		marginBottom: 20,
		textAlign: "center",
		fontSize: 18,
	},
	backButton: {
		marginTop: 20,
		backgroundColor: "gray",
	},
	leaderboardContainer: {
		width: "100%",
		padding: 20,
		marginTop: 20,
	},
	leaderboardTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
	},
	leaderboardEntry: {
		fontSize: 16,
		textAlign: "center",
	},
	scoreHistoryContainer: {
		width: "100%",
		padding: 20,
		backgroundColor: "rgba(255, 255, 255, 0.7)",
		marginTop: 20,
	},
	scoreHistoryTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		color: "white",
		textAlign: "center",
	},
	scoreHistoryEntry: {
		fontSize: 16,
		color: "white",
		textAlign: "center",
	},
});

export default SecurityBreachGame;
