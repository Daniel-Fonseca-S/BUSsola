import { Button, Stack, Text } from "@react-native-material/core";
import React, { useEffect } from "react";
import Rota from "src/model/rota";
import Cidade from "src/model/cidade";
import Estado from "src/model/estado";
import Menu from "src/components/menu";
import useUsuario from "src/utils/hooks/useUsuario";
import { StyleSheet, View } from "react-native";
import { child, get, getDatabase, ref } from "firebase/database";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SelecionarRota(vai: any) {
	const [estado, setEstado] = React.useState<Estado>();
	const [cidade, setCidade] = React.useState<Cidade>();
	const [rotas, setRotas] = React.useState<Rota[]>([]);
	const usuario = useUsuario();

	const database = getDatabase();

	const idUsuario: string = usuario.uid;

	async function getCidadeUsuario() {
		get(child(ref(database), "usuario/" + idUsuario)).then((snapshot) => {
			if (snapshot.exists()) {
				setCidade(snapshot.val().resideCidade);
				setEstado(snapshot.val().resideEstado);
			} else {
				console.log("Usuário não encontrado");
			}
		}).catch((error) => {
			console.error(error);
		});
	}

	async function loadRotas() {
		get(child(ref(database), `estado/${estado?.id}/cidade/${cidade?.id}/rota`)).then((snapshot) => {
			const newRotas: Rota[] = [];
			if (snapshot.exists()) {
				snapshot.forEach((childSnapshot) => {
					const childKey = childSnapshot.key;
					const childData: Rota | undefined = childSnapshot.key ? {
						id: childKey,
						nome: childSnapshot.val().nome,
						descricao: childSnapshot.val().descricao
					} as Rota : undefined;
					if (childData !== undefined) {
						newRotas.push(childData);
					}
				});
			}
			setRotas(newRotas);
		}).catch((error) => {
			console.error(error);
		});
	}

	useEffect(() => {
		getCidadeUsuario();
	}, []);

	useEffect(() => {
		console.log("Cidade: " + cidade?.nome);
		console.log("Estado: " + estado?.nome);
		if (cidade !== undefined && estado !== undefined) {
			loadRotas();
		}
	}, [cidade, estado]);

	return (
		<View style={styles.rota}>
			<Menu />
			<Text style={styles.titulo}>Rotas</Text>
			<Stack
				style={styles.tackstack}>
				{rotas.length > 0 ?
					rotas.map((rota) => {
						return (
							<ItemRota
								key={rota.id}
								rota={rota}
								vai={vai}
							/>
						);
					})
					: <Text style={styles.lbl}>Nenhuma rota encontrada</Text>
				}
			</Stack>
		</View>
	);


}

interface propsItemRota {
	rota: Rota;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	vai: any;
}

function ItemRota(props: propsItemRota) {
	return (
		<View
			style={styles.linha}>
			<Text
				style={styles.lbl}>
				Rota: {props.rota.nome}
			</Text>
			<Button
				title={"IR"}
				color={"#8D28FF"}
				style={styles.butn}
				onPress={() => { props.vai.navigation.navigate("Home"); }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	rota: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "#000",
		padding: 10,
	},
	titulo: {
		fontSize: 30,
		color: "#8D28FF",
		fontWeight: "bold",
		marginBottom: 50,
	},
	tackstack: {
		width: "95%",
	},
	linha: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
	},
	lbl: {
		color: "#B7B7B7",
	},
	butn: {
		width: "22.5%",
	}
});