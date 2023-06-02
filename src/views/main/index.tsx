import { Button, Text } from "@react-native-material/core";
import * as Location from "expo-location";
import { get, getDatabase, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, {
	Callout,
	Marker,
	PROVIDER_GOOGLE,
	Polyline,
	Region
} from "react-native-maps";
import Loading from "src/components/loading";
import Menu from "src/components/menu";
import Ponto from "src/model/ponto";
import Rota from "src/model/rota";
import useUsuario from "src/utils/hooks/useUsuario";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Mapa({ navigation }: any) {
	const usuario = useUsuario();
	const [region, setRegion] = useState<Region>();
	const [pontos, setPontos] = useState<Ponto[]>([]);
	const [rota, setRota] = useState<Rota | undefined>();
	const [loading, setLoading] = useState<boolean>(false);
	const [flag, setFlag] = useState<boolean>(false);
	const [flag2, setFlag2] = useState<boolean>(false);
	const [busLocation, setBusLocation] = useState<Region>();

	const database = getDatabase();

	useEffect(() => {
		setLoading(true);
		getCurrentPosition();
		if (usuario?.resideEstado !== undefined && usuario?.resideCidade !== undefined) getRotaUsuario();
		else setLoading(false);
		setBusLocation(undefined);
		setFlag(!flag);
		setFlag2(!flag2);
		setLoading(false);
	}, []);

	useEffect(() => {
		if (usuario?.resideEstado !== undefined && usuario?.resideCidade !== undefined && usuario?.rota !== undefined) {
			getRotaUsuario();
		}
	}, [usuario]);

	useEffect(() => {
		if (rota !== undefined) {
			getPontos();
		}
	}, [rota]);

	useEffect(() => {
		if (usuario?.onibus !== undefined && usuario?.onibus === true) {
			if (usuario.rota?.id !== undefined) {
				setTimeout(async () => {
					await setBusCurrentLocation();
					setFlag(!flag);
					setFlag2(!flag2);
				}, 3000);
			}
		}
	}, [flag]);

	useEffect(() => {
		if (usuario?.onibus === undefined || usuario?.onibus === false) {
			if (usuario?.rota?.id !== undefined) {
				setTimeout(async () => {
					await getOnibusLocation();
					setFlag(!flag);
					setFlag2(!flag2);
				}, 3000);
			}
		}
	}, [flag2]);

	async function setBusCurrentLocation() {
		setLoading(true);
		if (usuario?.onibus === true) {
			if (region !== undefined) {
				await set(ref(database, `estado/${usuario?.resideEstado?.id}/cidade/${usuario?.resideCidade?.id}/rota/${usuario?.rota?.id}/onibus/`), {
					latitude: region?.latitude,
					longitude: region?.longitude,
				}).then(() => {
					console.log("Data set.");
				}
				).catch((error) => {
					console.error(error);
				}
				);
			}
		}
	}

	const getCurrentPosition = async () => {
		setLoading(true);
		const { status } = await Location.requestForegroundPermissionsAsync();

		if (status !== "granted")
			Alert.alert("Ops!", "Permissão de acesso a localização negada.");

		const {
			coords: { latitude, longitude },
		} = await Location.getCurrentPositionAsync();

		setRegion({ latitude, longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
		setLoading(false);
	};

	async function getRotaUsuario() {
		setLoading(true);
		await get(ref(database, `usuario/${usuario?.uid}/rota`)).then((snapshot) => {
			if (snapshot.exists()) {
				setRota({
					descricao: snapshot.val().descricao,
					id: snapshot.val().id,
					nome: snapshot.val().nome,
				});
			}
		}).catch((error) => {
			console.error(error);
			setLoading(false);
		});
		setLoading(false);
	}

	async function getPontos() {
		setLoading(true);
		await get(ref(database, `estado/${usuario?.resideEstado?.id}/cidade/${usuario?.resideCidade?.id}/rota/${usuario?.rota?.id}/ponto`)).then((snapshot) => {
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
				setLoading(false);
			}
		}).then(() => {
			setBusLocation(undefined);
			setFlag(!flag);
			setFlag2(!flag2);
		}).catch(() => {
			Alert.alert("Ops!", "Não foi possível carregar os pontos.");
			setLoading(false);
		});
		setLoading(false);
	}

	async function getOnibusLocation() {
		if (usuario?.onibus === false || usuario?.onibus === undefined) {
			await get(ref(database, `estado/${usuario?.resideEstado?.id}/cidade/${usuario?.resideCidade?.id}/rota/${usuario?.rota?.id}/onibus/`)).then((snapshot) => {
				if (snapshot.exists()) {
					const onibusLatitude = snapshot.val().latitude;
					const onibusLongitude = snapshot.val().longitude;
					setBusLocation({ latitude: onibusLatitude, longitude: onibusLongitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
					console.log(busLocation);
				}
			}
			).catch((error) => {
				console.error(error);
			});
		}
	}

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
				initialRegion={region}
				key={region?.latitude?.toString()}
				showsUserLocation={true}
				showsMyLocationButton={true}
				showsCompass={true}
				showsScale={true}
				showsBuildings={true}
				zoomEnabled={true}
				followsUserLocation={true}
			>
				{
					busLocation !== undefined &&
					<Marker
						coordinate={{
							latitude: busLocation.latitude,
							longitude: busLocation.longitude,
						}}
						title="Ônibus"
						description="Localização do ônibus"
						pinColor="#8D28FF"
						image={require("src/assets/icons/bus.png") ?? undefined}
					>
						<Callout tooltip />
					</Marker>
				}
				{
					pontos.map((ponto) => (
						<Marker
							key={ponto.uid}
							coordinate={{
								latitude: ponto.latitude,
								longitude: ponto.longitude,
							}}
							title={ponto.descricao}
							description={ponto.bairro + " - " + ponto.rua}
							pinColor="#fff600"
							onPress={
								() => {
									navigation.navigate("Parada de Embarque", {
										ponto,
									});
								}
							}
						>
							<Callout tooltip />
						</Marker>
					))
				}
				{
					pontos.length > 1 &&
					<Polyline
						coordinates={pontos.map((ponto) => ({
							latitude: ponto.latitude,
							longitude: ponto.longitude,
						}))}
						strokeColor="#fff600"
						strokeWidth={3}
						fillColor="#fff600"
					/>
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
		backgroundColor: "#1E1E1E",
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
