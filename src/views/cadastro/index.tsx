import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Button, IconButton, TextInput } from "@react-native-material/core";
import * as ImagePicker from "expo-image-picker";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import Loading from "src/components/loading";
import firebase from "src/utils/firebase";
import style from "./style";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Cadastro({ navigation }: any) {
	const [email, setEmail] = React.useState("");
	const [telefone, setTelefone] = React.useState("");
	const [senha, setSenha] = React.useState("");
	const [senhaVisivel, setSenhaVisivel] = React.useState(true);
	const styles = style;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [image, setImage] = React.useState<any>();
	const [imagemEnviada, setImagemEnviada] = React.useState("");
	const [loading, setLoading] = React.useState(false);

	const database = getDatabase(firebase);

	const phoneMask = (value: string) => {
		if (!value) setTelefone("");
		value = value.replace(/\D/g, "");
		value = value.replace(/(\d{2})(\d)/, "($1) $2");
		value = value.replace(/(\d)(\d{4})$/, "$1-$2");
		setTelefone(value);
	};

	async function cadastro() {
		setLoading(true);
		const auth = getAuth();
		await createUserWithEmailAndPassword(auth, email, senha)
			.then(async (userCredential) => {
				await set(ref(database, "usuario/" + userCredential.user.uid), {
					telefone: telefone,
					email: email,
					senha: senha,
					image: imagemEnviada,
				});
				Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
				navigation.navigate("Log Out");
			})
			.catch((error) => {
				Alert.alert("Erro", error.message, [{ text: "OK" }], { cancelable: false });
			});
		setLoading(false);
	}

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
			setImage(result.assets[0].uri);
			if (result.assets[0].base64 != undefined)
				setImagemEnviada(result.assets[0].base64);
		}
		setLoading(false);
	};

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>Cadastre-se</Text>
				<Text style={{ fontSize: 25, color: "#B7B7B7" }}>Crie uma conta para continuar</Text>
			</View>
			<View style={styles.content}>
				<View style={{ marginBottom: 30, alignItems: "center" }}>
					<TouchableOpacity onPress={pickImage} disabled={loading}>
						<Image
							style={styles.image}
							source={(image == undefined) ? require("../../../assets/stock-image-avatar.jpg") : { uri: image }}
						/>
					</TouchableOpacity>
					<Button
						style={styles.textButton}
						title="Upload da foto de perfil"
						variant="text"
						titleStyle={styles.buttonTitle}
						uppercase={false}
						color="#B7B7B7"
						onPress={pickImage}
						disabled={loading}
					/>
				</View>
				<TextInput
					style={styles.textInput}
					label="E-mail"
					leading={props => <Icon name="email" {...props} />}
					variant="filled"
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
				/>
				<TextInput
					style={styles.textInput}
					label="Telefone"
					leading={props => <Icon name="phone" {...props} />}
					variant="filled"
					value={telefone}
					onChangeText={phoneMask}
				/>

				<TextInput
					style={styles.textInput}
					label="Senha"
					variant="filled"
					leading={props => <Icon name="lock" {...props} />}
					trailing={props => (
						<IconButton
							icon={props => !senhaVisivel ? <Icon name="eye-off" {...props} /> : <Icon name="eye" {...props} />}
							{...props}
							onPress={() => setSenhaVisivel(!senhaVisivel)}
						/>
					)}
					value={senha}
					onChangeText={setSenha}
					secureTextEntry={senhaVisivel}
				/>
			</View>
			<Loading carregando={loading} />
			<View style={styles.bottomContent}>
				<Button
					style={styles.button}
					title="Cadastrar"
					contentContainerStyle={{ height: 50 }}
					onPress={() => {
						cadastro();
					}}
					disabled={email == "" || telefone.length < 13 || senha == "" || loading}
				/>
				<Text style={{ fontSize: 20, color: "#B7B7B7" }}>Já tem uma conta?</Text>
				<Button
					style={styles.textButton}
					title="Entre"
					variant="text"
					titleStyle={styles.buttonTitle}
					uppercase={false}
					color="#B7B7B7"
					onPress={() => navigation.navigate("Log Out")}
					disabled={loading}
				/>
			</View>
		</View>
	);
}