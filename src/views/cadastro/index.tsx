import React from "react";
import { Alert, Image, Text, View } from "react-native";
import { IconButton, TextInput, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import style from "./style";

export default function Cadastro() {
	const [email, setEmail] = React.useState("");
	const [telefone, setTelefone] = React.useState("");
	const [senha, setSenha] = React.useState("");
	const [senhaVisivel, setSenhaVisivel] = React.useState(true);
	const styles = style;

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>Cadastre-se</Text>
				<Text style={styles.text}>Crie uma conta para continuar</Text>
			</View>
			<View style={styles.content}>
				<View style={{marginBottom: 50}}>
					<Image style={styles.image} source={require("../../../assets/stock-image-avatar.jpg")}></Image>
					<Button 
						style={styles.textButton} 
						title="Upload da foto de perfil"
						variant="text"
						uppercase={false}
						color="#B7B7B7"
						onPress={() => Alert.alert("É nada kkkkk")}/>
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
			<Button 
				style={styles.button} 
				title="Cadastrar"
				onPress={() => Alert.alert("Nem cadastrou nada kkkkkkkkkkkkkkj")}/>
		</View>
	);
}