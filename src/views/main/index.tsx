import { Button, Text } from "@react-native-material/core";
import * as Location from "expo-location";
import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, {
	Callout,
	Marker,
	PROVIDER_GOOGLE,
	Region,
} from "react-native-maps";
import Loading from "src/components/loading";
import Menu from "src/components/menu";
import Ponto from "src/model/ponto";
import Rota from "src/model/rota";
import useUsuario from "src/utils/hooks/useUsuario";

const initialRegion = {
	latitude: -25.443195,
	longitude: -49.280977,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Mapa({ navigation }: any) {
	const [region, setRegion] = useState<Region>();
	const [pontos, setPontos] = useState<Ponto[]>([]);
	const [rota, setRota] = useState<Rota | undefined>();
	const usuario = useUsuario();
	const [loading, setLoading] = useState<boolean>(false);

	const database = getDatabase();

	const getCurrentPosition = async () => {
		setLoading(true);
		const { status } = await Location.requestForegroundPermissionsAsync();

		if (status !== "granted")
			Alert.alert("Ops!", "Permissão de acesso a localização negada.");

		const {
			coords: { latitude, longitude },
		} = await Location.getCurrentPositionAsync();

		setRegion({ latitude, longitude, latitudeDelta: 100, longitudeDelta: 100 });
		setLoading(false);
	};

	async function getRotaUsuario() {
		setLoading(true);
		await get(ref(database, `usuario/${usuario.uid}/rota`)).then((snapshot) => {
			if (snapshot.exists()) {
				setRota({
					descricao: snapshot.val().descricao,
					id: snapshot.val().id,
					nome: snapshot.val().nome,
				});
			}
		});
		setLoading(false);
	}

	async function getPontos() {
		setLoading(true);
		await get(ref(database, `estado/${usuario.resideEstado.id}/cidade/${usuario.resideCidade.id}/rota/${usuario.rota.id}/ponto`)).then((snapshot) => {
			if (snapshot.exists()) {
				const pontos: Ponto[] = [];
				snapshot.forEach((childSnapshot) => {
					const ponto = childSnapshot.val();
					pontos.push({
						uid: childSnapshot.key,
						...ponto,
					});
				});
				setPontos(pontos);
			}
		});
		setLoading(false);
	}

	useEffect(() => {
		getCurrentPosition();
		if (usuario.resideEstado !== undefined && usuario.resideCidade !== undefined) getRotaUsuario();
	}, []);

	useEffect(() => {
		if (usuario.resideEstado !== undefined && usuario.resideCidade !== undefined && usuario.rota !== undefined) {
			getRotaUsuario();
		}
	}, [usuario]);

	useEffect(() => {
		if (rota !== undefined) getPontos();
	}, [rota]);

	return (
		<View style={styles.container}>
			<Menu />
			<Loading carregando={loading} />
			<View style={styles.cabecalho}>
				<Text style={styles.titulo}>
					Rota: {rota?.nome ?? "Sem rota definida"}
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
			// onPress={() => { navigation.navigate("Parada de Embarque"); }}
			>
				{
					pontos.map((ponto) => (
						<Marker
							key={ponto.uid}
							coordinate={{
								latitude: ponto.latitude,
								longitude: ponto.longitude,
							}}
							title={ponto.descricao}
							description={ponto.descricao}
						>
							<Callout tooltip />
						</Marker>
					))
				}
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
		alignSelf: "center",
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
