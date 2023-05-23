import React, { useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Cidade from "src/model/cidade";
import Estado from "src/model/estado";
import Menu from "src/components/menu";
import useUsuario from "src/utils/hooks/useUsuario";
import SelectDropdown from "react-native-select-dropdown";
import { Button, Text } from "@react-native-material/core";
import { child, get, getDatabase, ref, set, update } from "firebase/database";
import Loading from "src/components/loading";

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

	useEffect(() => {
		setLoading(true);
		loadEstados();
		if (estado !== undefined) {
			loadCidades(estado);
		}

		verificarCidadeUsuario(idUsuario);
		setLoading(false);
	}, [estado]);

	function setCidadeUsuario() {
		update(ref(database, "usuario/" + idUsuario), {
			resideCidade: cidade,
			resideEstado: estado
		}).then(() => {
			Alert.alert("Cidade atualizada com sucesso!");
			setLoading(false);
		}).catch((error) => {
			Alert.alert(error);
			setLoading(false);
		});
	}

	async function loadEstados() {
		get(child(ref(database), "estado")).then((snapshot) => {
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
	}

	async function loadCidades(estado: Estado) {
		get(child(ref(database), "estado/" + estado.id + "/cidade")).then((snapshot) => {
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
	}

	async function verificarCidadeUsuario(idUsuario: string) {
		get(child(ref(database), "usuario/" + idUsuario)).then((snapshot) => {
			if (snapshot.exists()) {
				const cidadeUsuario = snapshot.val().reside;
				if (cidadeUsuario !== undefined) {
					const cidadeUsuarioArray = cidadeUsuario.split(" ");
					const cidadeUsuarioNome = cidadeUsuarioArray[0];
					const estadoUsuarioSigla = cidadeUsuarioArray[1];
					const estadoUsuario = estados.find((estado) => { return estado.sigla === estadoUsuarioSigla; });
					if (estadoUsuario !== undefined) {
						const cidadeUsuarioObj = cidades.find((cidade) => { return cidade.nome === cidadeUsuarioNome; });
						if (cidadeUsuarioObj !== undefined) {
							setEstado(estadoUsuario);
							setCidade(cidadeUsuarioObj);
						}
					}
				}
			} else {
				console.log("Usuário não encontrado");
			}
		}).catch((error) => {
			console.error(error);
		});
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
						data={estados.map((estado) => { return `${estado.nome} (${estado.sigla})`; }) ?? []}
						onSelect={(selectedItem) => {
							setEstado(estados.find((estado) => { return `${estado.nome} (${estado.sigla})` === selectedItem; }));
							setCidade(undefined);
							dropdownRef.current?.reset();
						}}
						buttonTextAfterSelection={(selectedItem) => {
							return selectedItem;
						}}
						rowTextForSelection={(item) => {
							return item;
						}}
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
						data={cidades.map((cidade) => { return cidade.nome; }) ?? []}
						ref={dropdownRef}
						onSelect={(selectedItem) => {
							setCidade(cidades.find((cidade) => { return cidade.nome === selectedItem; }));
							dropdownRef.current?.reset();
						}}
						buttonTextAfterSelection={(selectedItem) => {
							return selectedItem;
						}}
						rowTextForSelection={(item) => {
							return item;
						}}
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
		backgroundColor: "#000",
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