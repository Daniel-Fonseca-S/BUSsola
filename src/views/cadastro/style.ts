import { StyleSheet } from "react-native";

const syles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1E1E1E",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		paddingTop: 20,
	},
	content: {
		backgroundColor: "#1E1E1E",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	textInput: {
		width: "80%",
		marginBottom: 15,
		marginTop: 15,
	},
	title: {
		fontSize: 35,
		color: "#8D28FF",
		fontWeight: "bold",
		margin: 10,
		marginTop: 40,
	},
	text: {
		fontSize: 25,
		color: "#B7B7B7",
	},
	button: {
		width: "80%",
		height: 50,
		justifyContent: "center",
		marginBottom: 45,
		marginTop: 10,
	},
	textButton: {
		marginBottom: 5,
		marginTop: 10,
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: 100,
	}
});

export default syles;