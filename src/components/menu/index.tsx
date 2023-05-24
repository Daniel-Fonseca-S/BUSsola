import React from "react";
import { useState } from "react";
import Loading from "../loading";
import firebase from "src/utils/firebase";
import { routes } from "../../utils/routes";
import * as ImagePicker from "expo-image-picker";
import useUsuario from "src/utils/hooks/useUsuario";
import { getDatabase, ref, update } from "firebase/database";
import { navigationPop, navigationPush } from "src/utils/navigationFun";
import { Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Menu() {
	const usuario = useUsuario();
	const [loading, setLoading] = useState(false);
	const [menuAtivo, setMenuAtivo] = useState(false);
	const base64Image = `data:image/png;base64,${usuario?.image}`;

	const database = getDatabase(firebase);

	const pickImage = async () => {
		setLoading(true);
		// No permissions request is necessary for launching the image library
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			base64: true,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		});

		if (!result.canceled) {
			if (result.assets[0].base64 != undefined) {
				await update(ref(database, "usuario/" + usuario?.uid), {
					image: result.assets[0].base64,
				});
			}
		} else {
			console.log("Imagem não selecionada");
		}

		setLoading(false);
	};

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
						<Loading carregando={loading} />
						<TouchableOpacity onPress={() => navigationPop()} style={menuAtivo ? styles.back : styles.disabled}>
							<Image source={require("src/assets/icons/back.png")} style={styles.hamburguerIcon} />
						</TouchableOpacity>
						<TouchableOpacity style={{ zIndex: 99, alignItems: "center" }} onPress={() => setMenuAtivo(false)}>
							<Image source={require("src/assets/icons/close.png")} style={menuAtivo ? styles.closeIcon : styles.disabled} />
						</TouchableOpacity>
						<TouchableOpacity style={styles.userImage} onPress={() => pickImage()} disabled={loading}>
							{usuario?.image === "" ?
								<Image source={require("src/assets/icons/user.png")} style={{ width: 100, height: 100, borderRadius: 50 }} />
								:
								<Image source={{ uri: base64Image }} style={{ width: 100, height: 100, borderRadius: 50 }} />
							}
						</TouchableOpacity>
						<View style={styles.userInfo}>
							<Text>{usuario?.email}</Text>
							<Text>Cidade: {usuario?.resideCidade?.nome ? usuario?.resideCidade?.nome : "Não definida"}</Text>
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