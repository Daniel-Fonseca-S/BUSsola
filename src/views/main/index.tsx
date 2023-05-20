import { Button, Text } from "@react-native-material/core";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, {
	Callout,
	Marker,
	PROVIDER_GOOGLE,
	Region,
} from "react-native-maps";
import Menu from "src/components/menu";
import Ponto from "./models/ponto";

const initialRegion = {
	latitude: -25.443195,
	longitude: -49.280977,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421,
};

const pontos: Ponto[] = [

];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Rota({ navigation }: any) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [location, setLocation] = useState<LocationObject | null>(null);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [region, setRegion] = useState<Region>();

	const getCurrentPosition = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();

		if (status !== "granted")
			Alert.alert("Ops!", "Permissão de acesso a localização negada.");

		const {
			coords: { latitude, longitude },
		} = await Location.getCurrentPositionAsync();

		setRegion({ latitude, longitude, latitudeDelta: 100, longitudeDelta: 100 });
	};

	useEffect(() => {
		getCurrentPosition();
	}, []);

	let text = "Waiting..";
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		text = JSON.stringify(location);
	}

	return (
		<View style={styles.container}>
			<Menu />

			<View style={styles.cabecalho}>
				<Text style={styles.titulo}>
					Rota UTFPR - DV
				</Text>

				<Text style={styles.texto}>
					Encontre a parada perto de você
				</Text>
			</View>

			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.mapa}
				region={region}
				initialRegion={initialRegion}
				key={region?.latitude?.toString()}
				showsUserLocation={true}
				showsMyLocationButton={true}
				showsCompass={true}
				showsScale={true}
				showsBuildings={true}
				zoomEnabled={true}
				onPress={() => {navigation.navigate("Parada de Embarque");}}
			>
				{pontos.map((ponto) => (
					<Marker
						key={ponto.uid}
						coordinate={{
							latitude: ponto.latitude,
							longitude: ponto.longitude,
						}}
						title={ponto.nome}
						description={ponto.descricao}
					>
						<Callout tooltip>
							<View>

							</View>
						</Callout>
					</Marker>
				))}
			</MapView>

			<Button
				title={"Alterar Rota"}
				style={styles.botao}
				onPress={() => { navigation.navigate("Rotas"); }}
			/>
		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#000",
		paddingBottom: 50,
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
		position: "absolute",
		bottom: 30,
	},
	titulo: {
		fontSize: 30,
		color: "#8D28FF",
		fontWeight: "bold",
	},
	texto: {
		fontSize: 17,
		color: "#B7B7B7",
	},
	mapa: {
		height: "100%",
		width: "100%",
		resizeMode: "contain",
	},
	cabecalho: {
		marginHorizontal: 7,
		zIndex: 99,
		padding: 10,
		borderRadius: 10,
	}
});
