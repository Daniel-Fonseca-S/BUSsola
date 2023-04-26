import { useState } from "react";
import { Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { routes } from "./routes";

export default function Menu() {
	const [menuAtivo, setMenuAtivo] = useState(false);

	return (
		<View style={styles.container}>
			<View style={styles.navbar}>
				<TouchableOpacity onPress={() => setMenuAtivo(true)}>
					<Image source={require("src/assets/icons/HamburguerMenu.png")} style={menuAtivo ? styles.disabled : styles.hamburguerIcon} />
				</TouchableOpacity>
			</View>
			<Modal visible={menuAtivo} transparent={true} onRequestClose={() => setMenuAtivo(false)}>
				<SafeAreaView style={styles.safearea}>
					<View style={styles.content}>
						<TouchableOpacity style={{ zIndex: 99, alignItems: "center" }} onPress={() => setMenuAtivo(false)}>
							<Image source={require("src/assets/icons/close.png")} style={menuAtivo ? styles.closeIcon : styles.disabled} />
						</TouchableOpacity>
						<View style={styles.routes}>
							{routes.map((route) => (
								<TouchableOpacity key={route.id} style={styles.routeButton} onPress={() => setMenuAtivo(false)}>
									<Text style={styles.routeText}>{route.name}</Text>
								</TouchableOpacity>
							))}
						</View>
					</View>
					<TouchableOpacity style={{ flex: 1, zIndex: 9 }} onPress={() => setMenuAtivo(false)} />
				</SafeAreaView>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#000000aa",
		alignItems: "center"
	},
	navbar: {
		flex: 1,
		backgroundColor: "#fff600",
		alignItems: "center",
		justifyContent: "flex-end",
		maxHeight: 1500,
		width: 1500,
		padding: 5,
		borderRadius: 750,
		marginTop: -1425
	},
	hamburguerIcon: {
		width: 45,
		height: 45
	},
	disabled: {
		display: "none"
	},
	closeIcon: {
		marginTop: -15,
		width: 35,
		height: 35,
	},
	safearea: {
		flex: 1
	},
	content: {
		flex: 3,
		marginTop: 20,
		backgroundColor: "#fff600",
		width: 800,
		alignSelf: "center",
		borderRadius: 750,
		borderTopStartRadius: 0,
		borderTopEndRadius: 0,
		alignItems: "center"
	},
	routes: {
		width: "45%",
		marginTop: 20,
	},
	routeButton: {
		marginTop: 10,
		padding: 5,
		borderRadius: 10,
		backgroundColor: "#eee600"
	},
	routeText: {
		color: "#000",
		fontSize: 20
	}
});