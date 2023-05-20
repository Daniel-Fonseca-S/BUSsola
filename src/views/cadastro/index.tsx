import React from "react";
import { Image, Text, View } from "react-native";
import { IconButton, TextInput, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import style from "./style";
import * as ImagePicker from "expo-image-picker";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Cadastro({ navigation }: any) {
	const [email, setEmail] = React.useState("");
	const [telefone, setTelefone] = React.useState("");
	const [senha, setSenha] = React.useState("");
	const [senhaVisivel, setSenhaVisivel] = React.useState(true);
	const styles = style;
	const [image, setImage] = React.useState("");
	
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			base64: true,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>Cadastre-se</Text>
				<Text style={{fontSize: 25, color: "#B7B7B7"}}>Crie uma conta para continuar</Text>
			</View>
			<View style={styles.content}>
				<View style={{marginBottom: 50, alignItems:"center"}}>
					<Image style={styles.image} source={(image == "") ? require("../../../assets/stock-image-avatar.jpg") : {uri : image}}></Image>
					<Button 
						style={styles.textButton} 
						title="Upload da foto de perfil"
						variant="text"
						titleStyle={styles.buttonTitle}
						uppercase={false}
						color="#B7B7B7"
						onPress={pickImage}/>
				</View>
				<TextInput
					style={styles.textInput}
					label="E-mail"
					leading={props => <Icon name="email" {...props} />}
					variant="filled"
					value={email}
					onChangeText={setEmail}
				/>
				<TextInput
					style={styles.textInput}
					label="Telefone"
					leading={props => <Icon name="phone" {...props} />}
					variant="filled"
					value={telefone}
					onChangeText={setTelefone}
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
							onPress={() => {
								setSenhaVisivel(!senhaVisivel);
							}}
						/>
					)}
					value={senha}
					onChangeText={setSenha}
					secureTextEntry={senhaVisivel}
				/>
			</View>
			<View style={styles.bottomContent}>
				<Button 
					style={styles.button} 
					title="Cadastrar"
					contentContainerStyle={{height: 50}}
					onPress={() => {navigation.navigate("Log Out"); }}/>
				<Text style={{fontSize: 20, color: "#B7B7B7"}}>Já tem uma conta?</Text>
				<Button 
					style={styles.textButton} 
					title="Entre"
					variant="text"
					titleStyle={styles.buttonTitle}
					uppercase={false}
					color="#B7B7B7"
					onPress={() => {navigation.navigate("Log Out"); }}/>
			</View>
		</View>
	);
}