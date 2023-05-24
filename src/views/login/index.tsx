import { useEffect, useState } from "react";
import Usuario from "src/model/usuario";
import Loading from "src/components/loading";
import useSetUsuario from "src/utils/hooks/setUsuario";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button, IconButton, Stack, Text, TextInput } from "@react-native-material/core";
import { Alert, Image, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from "react-native";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Login({ navigation }: any) {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [senhaVisivel, setSenhaVisivel] = useState(false);
	const [carregando, setCarregando] = useState(false);
	const setUsuario = useSetUsuario();

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const logo = require("../../../assets/logo.png");

	const database = getDatabase();

	const login = async () => {
		const auth = getAuth();
		setCarregando(true);
		await signInWithEmailAndPassword(auth, email, senha)
			.then(() => {
				navigation.navigate("Home");
				if (auth.currentUser)
					onValue(ref(database, "usuario/" + auth.currentUser.uid), (snapshot) => {
						if (snapshot.exists()) setUsuario({ ...snapshot.val(), uid: snapshot.key } as Usuario);
						else console.log("No data available");
					});
			})
			.catch((error) => {
				Alert.alert("Erro", error.message, [{ text: "OK" }], { cancelable: false });
			});
		setCarregando(false);
	};

	useEffect(() => {
		const auth = getAuth();
		if (auth.currentUser) auth.signOut();
	}, []);

	useEffect(() => {
		setUsuario(undefined);
		setEmail("");
		setSenha("");
	}, []);

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={"padding"}
			contentContainerStyle={{ flex: 1 }}
		>
			<Image source={logo} />

			<Stack style={styles.meio}>
				<TextInput
					variant="filled"
					label="Email"
					value={email}
					onChangeText={setEmail}
					style={styles.input}
					keyboardType="email-address"
					leading={props => <Icon name="email" {...props} />}
				/>

				<TextInput
					variant="filled"
					label="Senha"
					value={senha}
					onChangeText={setSenha}
					style={styles.input}
					keyboardType="default"
					leading={props => <Icon name="lock" {...props} />}
					secureTextEntry={!senhaVisivel}
					trailing={props => (
						<IconButton
							icon={props => !senhaVisivel ? <Icon name="eye-off" {...props} /> : <Icon name="eye" {...props} />}
							{...props}
							onPress={() => { setSenhaVisivel(!senhaVisivel); }}
						/>
					)}
				/>

				<Loading carregando={carregando} />

				<TouchableOpacity onPress={() => navigation.navigate("Recuperar Senha")} disabled={carregando}>
					<Text style={styles.texto}>
						Esqueceu sua senha?
					</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate("Cadastro")} disabled={carregando}>
					<Text style={styles.texto}>
						Não tem uma conta?
					</Text>
				</TouchableOpacity>
			</Stack>

			<Button
				title={"Login"}
				style={styles.botao}
				disabled={email.length === 0 || senha.length === 0 || carregando}
				onPress={login}
				trailing={props => <Icon name="login" {...props} />}
			/>
		</KeyboardAvoidingView>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#1E1E1E",
		paddingTop: 50,
		height: "100%",
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
	texto: {
		color: "#B7B7B7",
	},
	botao: {
		width: "80%",
		padding: 10,
	}
});