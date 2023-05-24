import React from "react";
import { Image, Text, View, ScrollView, SafeAreaView, Linking } from "react-native";
import { Button, Divider } from "@react-native-material/core";
import style from "../cadastro/style";
import Menu from "src/components/menu";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ParadaEmbarque({ navigation }: any) {
	const styles = style;

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Menu></Menu>
				<View style={{marginHorizontal: 70, alignItems:"center", flexDirection: "row"}}>
					<Image style={styles.image} source={require("../../../assets/stock-image-parada.jpg")}></Image>
					<View style={{marginLeft: 20, width: "70%"}}>
						<Text style={{fontSize: 25, color: "#B7B7B7", marginBottom: 10}}>Parada - Mercado No Ponto Parada</Text>
						<Text style={{fontSize: 20, color: "#8C938D", marginBottom: 5}}>Rua</Text>
						<Text style={{fontSize: 20, color: "#8C938D"}}>Bairro</Text>
					</View>
				</View>
				<View style={styles.content}>
					<Divider style={{width: "90%", marginTop: 10}} color="gray" />
					<ScrollView style={{margin: 20, maxHeight: 300}}>
						<Text style={{color: "#B7B7B7"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod massa felis, sed luctus elit venenatis at. Cras sodales nunc in dolor gravida, id suscipit lacus lobortis. 
							Nam convallis odio in lorem tempor, non rutrum dui dictum. Nunc tempor porttitor purus, at finibus diam scelerisque ac. Vestibulum arcu justo, posuere sit amet dolor vitae, 
							ultricies ultrices nisl. Sed vitae nunc eget nunc aliquam ultricies. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultrices nunc, eget aliquam nisl nisl vitae
							lorem. Sed vitae nunc eget nunc aliquam ultricies. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultrices nunc, eget aliquam nisl nisl vitae lorem.
						</Text>
					</ScrollView>
				</View>
				<View style={{margin: 20, alignSelf:"flex-start"}}>
					<Text style={{fontSize: 20, color: "#B7B7B7"}}>Mais informações</Text>
					<Text 
						style={{fontSize: 20, color: "#0274BC", textDecorationLine:"underline"}} 
						onPress={() => Linking.openURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}>
							Link
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