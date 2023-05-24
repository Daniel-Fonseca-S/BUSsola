import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Button, Stack, Text, TextInput } from "@react-native-material/core";
import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NovaSenha({ navigation }: any) {
	const [senha, setSenha] = useState("");
	const [confirmarSenha, setConfirmarSenha] = useState("");

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={"padding"}
			contentContainerStyle={{ flex: 1 }}
		>
			<View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", width: "60%" }}>
				<Text style={styles.titulo}>
					Nova Senha
				</Text>
				<Text style={{ color: "#B7B7B7", textAlign: "center" }}>
					Entre com a nova senha para continuar
				</Text>
			</View>

			<Stack style={styles.meio}>
				<TextInput
					variant="filled"
					label="Nova senha"
					value={senha}
					onChangeText={setSenha}
					style={styles.input}
					keyboardType="default"
					leading={props => <Icon name="lock" {...props} />}
					secureTextEntry={true}
					trailing={props => (<Icon name="eye-off" {...props} />)}
				/>

				<TextInput
					variant="filled"
					label="Confirmar senha"
					value={confirmarSenha}
					onChangeText={setConfirmarSenha}
					style={styles.input}
					keyboardType="default"
					leading={props => <Icon name="lock" {...props} />}
					secureTextEntry={true}
					trailing={props => (<Icon name="eye-off" {...props} />)}
				/>
			</Stack>

			<Button
				title={"Salvar"}
				style={styles.botao}
				disabled={senha !== confirmarSenha || senha.length < 6 || confirmarSenha.length < 6}
				onPress={() => { navigation.navigate("Home"); }}
				trailing={props => <Icon name="login" {...props} />}
			/>
		</KeyboardAvoidingView>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-around",
		backgroundColor: "#1E1E1E",
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
	}

});