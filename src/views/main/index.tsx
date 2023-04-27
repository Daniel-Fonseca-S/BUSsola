import { Button, Text } from "@react-native-material/core";
import { Image, StyleSheet, View } from "react-native";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Rota({ navigation }: any) {
	return (
		<View style={styles.container}>
			<View style={{ alignItems: "center" }}>
				<Text style={styles.titulo}>
					Rota UTFPR - DV
				</Text>

				<Text style={styles.texto}>
					Encontre a parada perto de você
				</Text>
			</View>

			<Image
				source={require("../../../assets/mapa-temporario.jpg")}
				style={styles.imagem}
			/>

			<Button
				title={"Alterar Rota"}
				style={styles.botao}
				onPress={() => { navigation.navigate("Rotas"); }}
			/>
		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#000",
		paddingVertical: 50,
	},
	meio: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 50,
	},
	input: {
		width: "80%",
		marginBottom: 10,
		padding: 10,
	},
	botao: {
		width: "80%",
		padding: 10,
	},
	titulo: {
		fontSize: 30,
		color: "#8D28FF",
		fontWeight: "bold",
	},
	texto: {
		fontSize: 20,
		color: "#B7B7B7",
	},
	imagem: {
		height: "75%",
		resizeMode: "contain",
	}
});