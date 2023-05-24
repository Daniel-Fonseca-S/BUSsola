import { useEffect, useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Button, Text, TextInput } from "@react-native-material/core";
import { KeyboardAvoidingView, StyleSheet, TextInput as Input, View, Alert } from "react-native";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RecuperarSenha({ navigation }: any) {

	const [telefone, setTelefone] = useState("");
	const [codigo, setCodigo] = useState("");
	const [enableReinitialize, setEnableReinitialize] = useState(false);

	const phoneMask = (value: string) => {
		if (!value) setTelefone("");
		value = value.replace(/\D/g, "");
		value = value.replace(/(\d{2})(\d)/, "($1) $2");
		value = value.replace(/(\d)(\d{4})$/, "$1-$2");
		setTelefone(value);
	};

	const genCodigo = () => {
		let codigo = "";
		for (let i = 0; i < 6; i++) {
			codigo += Math.floor(Math.random() * 10).toString();
		}
		console.log("codigo: " + codigo);
		setCodigo(codigo);
	};

	useEffect(() => {
		if (!enableReinitialize) {
			setEnableReinitialize(true);
			return;
		}
		Alert.alert("Código de verificação", codigo, [{ text: "OK" }], { cancelable: false });
	}, [codigo]);

	//create message box showing the generated code

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={"padding"}
			contentContainerStyle={{ flex: 1 }}
		>
			<Text style={styles.titulo}>Recuperar senha</Text>
			<Text style={{ color: "#B7B7B7" }}>Crie uma conta para continuar</Text>

			<TextInput
				label="Telefone"
				value={telefone}
				onChangeText={(e) => { if (e.length <= 15) phoneMask(e); }}
				style={styles.input}
				variant="filled"
				keyboardType="phone-pad"
				leading={props => <Icon name="phone-outline" {...props} />}
			/>

			<Button
				title="Enviar código"
				style={styles.botao}
				onPress={() => {
					console.log("teste");
					if (telefone.length > 13) genCodigo();
				}}
				disabled={telefone.length < 15}
			/>

			<Text style={styles.codigoDigitoCaractere}>Adicione o Código de verificação</Text>

			<View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", }}>
				<Input
					style={styles.codigoVerificacao}
					value={codigo}
					onChangeText={setCodigo}
					keyboardType="numeric"
					selectionColor={"#8D28FF"}
					maxLength={6}
				/>

				<View style={styles.codigoDigitos}>
					<View style={styles.codigoDigitoContainer} >
						<Text style={styles.codigoDigitoCaractere}>
							{codigo.length > 0 ? codigo[0] : ""}
						</Text>
					</View>

					<View style={styles.codigoDigitoContainer} >
						<Text style={styles.codigoDigitoCaractere}>
							{codigo.length > 1 ? codigo[1] : ""}
						</Text>
					</View>

					<View style={styles.codigoDigitoContainer} >
						<Text style={styles.codigoDigitoCaractere}>
							{codigo.length > 2 ? codigo[2] : ""}
						</Text>
					</View>

					<View style={styles.codigoDigitoContainer} >
						<Text style={styles.codigoDigitoCaractere}>
							{codigo.length > 3 ? codigo[3] : ""}
						</Text>
					</View>

					<View style={styles.codigoDigitoContainer}>
						<Text style={styles.codigoDigitoCaractere}>
							{codigo.length > 4 ? codigo[4] : ""}
						</Text>
					</View>

					<View style={styles.codigoDigitoContainer} >
						<Text style={styles.codigoDigitoCaractere}>
							{codigo.length > 5 ? codigo[5] : ""}
						</Text>
					</View>
				</View>
			</View>

			<Button
				title="Recuperar"
				style={styles.botaoConfirmar}
				onPress={() => { navigation.navigate("Nova Senha"); }}
				disabled={codigo.length < 6}
			/>

		</KeyboardAvoidingView>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#1E1E1E",
		paddingVertical: 50,
	},
	titulo: {
		fontSize: 30,
		color: "#8D28FF",
		fontWeight: "bold",
	},
	botaoConfirmar: {
		width: "80%",
		padding: 10,
		bottom: -150
	},
	botao: {
		width: "80%",
		padding: 10,
		marginVertical: 15,
	},
	input: {
		width: "80%",
		marginVertical: 30,
		padding: 10,
	},
	codigoVerificacao: {
		width: "80%",
		marginVertical: 30,
		padding: 10,
		height: 50,
		color: "#FFF",
		position: "absolute",
		opacity: 0,
		top: 0,
		zIndex: 1,
	},
	codigoDigitoContainer: {
		width: 50,
		height: 50,
		marginHorizontal: 5,
		alignItems: "center",
		justifyContent: "center",
		borderBottomColor: "#fff",
		borderBottomWidth: 2,
	},
	codigoDigitos: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 30,
	},
	codigoDigitoCaractere: {
		color: "white"
	}
});