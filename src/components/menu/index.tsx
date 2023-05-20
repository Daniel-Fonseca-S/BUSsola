import { useState } from "react";
import { routes } from "../../utils/routes";
import { navigationPop, navigationPush } from "src/utils/navigationFun";
import { Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
						<TouchableOpacity onPress={() => navigationPop()} style={menuAtivo ? styles.back : styles.disabled}>
							<Image source={require("src/assets/icons/back.png")} style={styles.hamburguerIcon} />
						</TouchableOpacity>
						<TouchableOpacity style={{ zIndex: 99, alignItems: "center" }} onPress={() => setMenuAtivo(false)}>
							<Image source={require("src/assets/icons/close.png")} style={menuAtivo ? styles.closeIcon : styles.disabled} />
						</TouchableOpacity>
						<View style={styles.userImage}>
							<Image source={require("src/assets/icons/user.png")} style={{ width: 100, height: 100, borderRadius: 50 }} />
						</View>
						<View style={styles.userInfo}>
							<Text>Usuário 001</Text>
							<Text>Cidade: Dois Vizinhos</Text>
						</View>
						<View style={styles.routes}>
							{routes.map((route) => (
								<TouchableOpacity key={route.id} style={styles.routeButton} onPress={() => { navigationPush(route.name); setMenuAtivo(false); }}>
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
		backgroundColor: "#1E1E1E",
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
		marginTop: 5
	},
	routeButton: {
		marginTop: 5,
		padding: 5,
		borderBottomWidth: 1,
		borderBottomColor: "#00000055"
	},
	routeText: {
		color: "#000",
		fontSize: 22
	},
	back: {
		position: "absolute",
		top: -20,
		left: 230,
		zIndex: 99,
		width: 45
	},
	userImage: {
		marginTop: 20,
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "#00000055",
		alignItems: "center",
		justifyContent: "center"
	},
	userInfo: {
		marginTop: 10,
		alignItems: "center",
		fontSize: 20
	}
});