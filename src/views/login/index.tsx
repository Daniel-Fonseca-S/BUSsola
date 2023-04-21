import EntradaTexto from "components/text-input";
import React from "react";
import { StyleSheet, View } from "react-native";


export default function Login() {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: "#000",
			alignItems: "center",
			justifyContent: "center",
		},
	});

	return (
		<View style={styles.container}>
			<EntradaTexto
				onChange={() => { console.log("teste"); }}
				value="teste"
				key={1}
				label="teste"
				multiline={false}
				type="default"
				icon="https://www.google.com/url?sa=i&url=http%3A%2F%2Fcbissn.ibict.br%2Findex.php%2Fimagens%2F1-galeria-de-imagens-01%2Fdetail%2F3-imagem-3-titulo-com-ate-45-caracteres&psig=AOvVaw1PbvCnMMwHodaq-B7CNDLW&ust=1682120406574000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCJiNrfzQuf4CFQAAAAAdAAAAABAD"
			/>
		</View>
	);
}