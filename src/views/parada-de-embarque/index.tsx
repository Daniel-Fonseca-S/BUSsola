import React from "react";
import { Image, Text, View, ScrollView, SafeAreaView, Linking } from "react-native";
import { Button, Divider } from "@react-native-material/core";
import style from "../cadastro/style";
import Menu from "src/components/menu";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ParadaEmbarque({ route, navigation }: any) {
	const styles = style;
	const ponto = route.params.ponto;
	
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Menu></Menu>
				<View style={{ marginHorizontal: 70, alignItems: "center", flexDirection: "row" }}>
					{ponto.imagem == "" ?  
						<Image style={styles.image} source={require("../../../assets/stock-image-parada.jpg")}></Image>
						:
						<Image style={styles.image} source={{uri: `data:image/png;base64,${ponto.imagem}`}}></Image>
					}
					<View style={{ marginLeft: 20, width: "70%" }}>
						<Text style={{ fontSize: 25, color: "#B7B7B7", marginBottom: 10 }}>{ponto.descricao}</Text>
						<Text style={{ fontSize: 20, color: "#8C938D", marginBottom: 5 }}>{ponto.rua}</Text>
						<Text style={{ fontSize: 20, color: "#8C938D" }}>{ponto.bairro}</Text>
					</View>
				</View>
				<View style={styles.content}>
					<Divider style={{ width: "92%", marginTop: 10 }} color="gray" />
					<ScrollView style={{ margin: 20, maxHeight: 300, alignSelf: "flex-start" }}>
						<Text style={{ color: "#FFFFFF" }}>{ponto.observacao}</Text>
					</ScrollView>
				</View>
				<View style={{ margin: 20, alignSelf: "flex-start" }}>
					<Text style={{ fontSize: 16, color: "#B7B7B7" }}>Mais informações</Text>
					<Text
						style={{ fontSize: 16, color: "#0274BC", textDecorationLine: "underline" }}
						onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${ponto.latitude}%2C${ponto.longitude}`)}>
						Acessar no Google Maps
					</Text>
				</View>
			</View>
			<View style={styles.bottomContent}>
				<Button
					style={styles.button}
					title="Algo está errado?"
					contentContainerStyle={{height: 50}}
					onPress={() => {navigation.navigate("Enviar Sugestao"); }}/>
			</View>
		</SafeAreaView>
	);
}