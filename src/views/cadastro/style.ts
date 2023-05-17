import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1E1E1E",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		paddingTop: 35,
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
	},
	title: {
		fontSize: 35,
		color: "#8D28FF",
		fontWeight: "bold",
	},
	button: {
		width: "80%",
		height: 50,
		justifyContent: "center",
		marginBottom: 15,
		marginTop: 10,
	},
	textButton: {
		marginBottom: 15,
		fontWeight: "bold",
	},
	buttonTitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	image: {
		width: 180,
		height: 180,
		borderRadius: 100,
		marginBottom: 5,
		marginTop: 15,
	}
});

export default styles;