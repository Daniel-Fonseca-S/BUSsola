import React from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View, Image } from "react-native";

interface Props {
	label?: string
	value: string;
	onChange: React.Dispatch<React.SetStateAction<string>>,
	type?: KeyboardTypeOptions
	multiline?: boolean
	icon?: string
}
export default function EntradaTexto(props: Props) {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: "transparent",
			alignItems: "flex-start",
			justifyContent: "center",
			width: "85%",
		},
		input: {
			borderWidth: 2,
			padding: 5,
			backgroundColor: "#F7F8F8",
			borderColor: "transparent",
			borderRadius: 10,
			width: "100%",
			color: "#ADA4A5",
			fontSize: 20,
			paddingLeft: 40,
		},
		label: {
			fontWeight: "bold",
			color: "#ADA4A5",
			fontSize: 20,
		}
	});

	return (
		<View style={styles.container}>
			<Text style={styles.label}>
				{props.value ? props.label : ""}
			</Text>

			<Image
				source={{
					uri: "https://www.google.com/url?sa=i&url=http%3A%2F%2Fcbissn.ibict.br%2Findex.php%2Fimagens%2F1-galeria-de-imagens-01%2Fdetail%2F3-imagem-3-titulo-com-ate-45-caracteres&psig=AOvVaw1PbvCnMMwHodaq-B7CNDLW&ust=1682120406574000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCJiNrfzQuf4CFQAAAAAdAAAAABAD",
				}}
			/>

			<TextInput
				style={styles.input}
				onChangeText={props.onChange}
				value={props.value}
				placeholder={props.label}
				keyboardType={props.type ?? "default"}
				multiline={props.multiline}
			/>
		</View>
	);
}