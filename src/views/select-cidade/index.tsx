import { Button, Text } from "@react-native-material/core";
import { child, get, getDatabase, ref, update } from "firebase/database";
import React, { useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Loading from "src/components/loading";
import Menu from "src/components/menu";
import Cidade from "src/model/cidade";
import Estado from "src/model/estado";
import useUsuario from "src/utils/hooks/useUsuario";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SelecionarCidade(vai: any) {
	const [estados, setEstados] = React.useState<Estado[]>([]);
	const [estado, setEstado] = React.useState<Estado>();
	const [cidades, setCidades] = React.useState<Cidade[]>([]);
	const [cidade, setCidade] = React.useState<Cidade>();
	const [loading, setLoading] = React.useState<boolean>(false);
	const usuario = useUsuario();

	const dropdownRef = React.useRef<SelectDropdown>(null);
	const database = getDatabase();

	const idUsuario: string = usuario.uid;

	//inicializa os estados e cidades
	useEffect(() => {
		setLoading(true);
		loadEstados();
		verificarCidadeUsuario(idUsuario);
	}, []);

	useEffect(() => {
		if (estado !== undefined) {
			setLoading(true);
			loadCidades();
		}
	}, [estado]);

	async function loadEstados() {
		await get(child(ref(database), "estado")).then((snapshot) => {
			const newEstados: Estado[] = [];
			if (snapshot.exists()) {
				snapshot.forEach((childSnapshot) => {
					const childKey = childSnapshot.key;
					const childData: Estado | undefined = childSnapshot.key ? { id: childKey, nome: childSnapshot.val().nome, sigla: childSnapshot.val().sigla } as Estado : undefined;
					if (childData !== undefined) {
						newEstados.push(childData);
					}
				});
			} else {
				console.log("Estados não encontrados");
			}
			setEstados(newEstados);
		}).catch((error) => {
			console.error(error);
		});
		setLoading(false);
	}

	async function loadCidades() {
		await get(child(ref(database), "estado/" + estado?.id + "/cidade")).then((snapshot) => {
			const newCidades: Cidade[] = [];
			if (snapshot.exists()) {
				snapshot.forEach((childSnapshot) => {
					const childKey = childSnapshot.key;
					const childData: Cidade | undefined = childSnapshot.key ? { id: childKey, nome: childSnapshot.val().nome } as Cidade : undefined;
					if (childData !== undefined) {
						newCidades.push(childData);
					}
				});
			} else {
				console.log("Cidades não encontradas");
			}
			setCidades(newCidades);
		}).catch((error) => {
			console.error(error);
		});
		setLoading(false);
	}

	async function verificarCidadeUsuario(idUsuario: string) {
		await get(child(ref(database), "usuario/" + idUsuario)).then((snapshot) => {
			if (snapshot.exists()) {
				const cidadeUsuario: Cidade | undefined = snapshot.val().resideCidade;
				if (cidadeUsuario !== undefined) {
					setCidade(cidadeUsuario);
					setEstado(snapshot.val().resideEstado);
				}
			} else {
				console.log("Usuário não encontrado");
			}
		}).catch((error) => {
			console.error(error);
		});
		setLoading(false);
	}

	async function setCidadeUsuario() {
		await update(ref(database, "usuario/" + idUsuario), {
			resideCidade: { id: cidade?.id, nome: cidade?.nome },
			resideEstado: { id: estado?.id, nome: estado?.nome, sigla: estado?.sigla },
			rota: null
		}).then(() => {
			console.log("Cidade do usuário atualizada");
			Alert.alert("Cidade atualizada com sucesso!");
			vai.navigation.navigate("Rotas");
		}).catch((error) => {
			console.error(error);
		}
		);
	}

	return (
		<View style={styles.visao}>

			<Menu />
			<Loading carregando={loading} />

			<View style={styles.cidade}>
				<Text style={styles.titulo}>Cidades</Text>
				<View>
					<Text style={styles.lbl}>ESTADO</Text>
					<SelectDropdown
						key={Math.random()}
						defaultButtonText={estado?.nome ?? "Selecione um estado"}
						buttonStyle={styles.btn1}
						buttonTextStyle={styles.btntxt}
						dropdownStyle={styles.selector}
						rowTextStyle={styles.row}
						data={estados}
						onSelect={(selectedItem: Estado) => { setEstado(selectedItem); setCidade(undefined); }}
						buttonTextAfterSelection={(selectedItem: Estado) => { return `${selectedItem.nome}  (${selectedItem.sigla})`; }}
						rowTextForSelection={(item: Estado) => { return `${item.nome}  (${item.sigla})`; }}
					/>
				</View>

				<View>
					<Text style={styles.lbl}>CIDADE</Text>
					<SelectDropdown
						key={Math.random()}
						defaultButtonText={cidade?.nome ?? "Selecione uma cidade"}
						buttonStyle={styles.btn1}
						buttonTextStyle={styles.btntxt}
						dropdownStyle={styles.selector}
						rowTextStyle={styles.row}
						data={cidades}
						ref={dropdownRef}
						onSelect={(selectedItem: Cidade) => { setCidade(selectedItem); }}
						buttonTextAfterSelection={(selectedItem: Cidade) => selectedItem.nome}
						rowTextForSelection={(item: Cidade) => item.nome}
						disabled={estado === undefined}
					/>
				</View>
			</View>

			<Button
				title="Salvar Cidade"
				style={styles.btn2}
				onPress={() => {
					setLoading(true);
					setCidadeUsuario();
				}}
				disabled={cidade === undefined || idUsuario === ""}
			/>

		</View>
	);

}

const styles = StyleSheet.create({
	visao: {
		flex: 1,
		backgroundColor: "#1E1E1E",
		alignItems: "center",
		padding: 10,
	},

	cidade: {
		width: "100%",
		alignItems: "center",
		padding: 10,
	},

	titulo: {
		fontSize: 30,
		color: "#8D28FF",
		fontWeight: "bold",
		marginBottom: 50,
	},

	lbl: {
		color: "#B7B7B7",
		fontWeight: "bold",
		fontSize: 20,
	},

	selector: {
		height: 125,
		backgroundColor: "#000",
		borderColor: "#B7B7B7",
		borderWidth: 2,
		borderRadius: 2.5,
	},

	row: {
		color: "#B7B7B7",
		textAlign: "left",
	},

	btn1: {
		backgroundColor: "#000",
		width: "75%",
		float: "left",
		textAlign: "left",
	},

	btn2: {
		width: "90%",
		alignItems: "center",
		padding: 10,
		position: "absolute",
		bottom: 35,
	},

	btntxt: {
		color: "#B7B7B7",
	},
});