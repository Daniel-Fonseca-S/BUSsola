import { Button, Stack, Text } from "@react-native-material/core";
import SelectDropdown from 'react-native-select-dropdown';
import React from "react";
import { StyleSheet, View } from "react-native";
import Menu from "src/components/menu";
import { set } from "react-native-reanimated";

const estados = [
    "São Paulo",
    "Rio de Janeiro",
    "Paraná",
    "Maranhão"
];

const sp = [
    "São Paulo",
    "São José dos Campos",
    "Diadema",
    "Osasco",
];

const rj = [
    "Rio de Janeiro",
    "Niterói",
    "Duque de Caxias",
    "Nova Iguaçu",
];

const pr = [
    "Curitiba",
    "Dois Vizinhos",
    "Maringá",
    "Francisco Beltrão"
];

const ma = [
    "São Luís",
    "Imperatriz",
    "Balsas",
    "Caxias"
];

export default function SelecionarCidade(vai: any) {
    const [estado, setEstado] = React.useState("São Paulo" as string);
    const [lista, setLista] = React.useState(sp as string[]);
    const [cidade, setCidade] = React.useState("São Paulo" as string);
    const dropdownRef = React.useRef<SelectDropdown>(null);

    React.useEffect(() => {
        switch (estado) {
            case "São Paulo":
                setLista(sp);
                break;
            case "Rio de Janeiro":
                setLista(rj);
                break;
            case "Paraná":
                setLista(pr);
                break;
            case "Maranhão":
                setLista(ma);
                break;
        }
    }, [estado]);
    return (
        <View
            style={styles.visao}>

            <Menu />

            <View style={styles.cidade}>
                <Text style={styles.titulo}>Cidades</Text>
                <View>
                    <Text style={styles.lbl}>ESTADO</Text>
                    <SelectDropdown
                        defaultButtonText="Selecione um estado"
                        buttonStyle={styles.btn1}
                        buttonTextStyle={styles.btntxt}
                        dropdownStyle={styles.selector}
                        rowTextStyle={styles.row}
                        data={estados}
                        onSelect={(selectedItem) => {
                            setEstado(selectedItem)
                            dropdownRef.current?.reset();
                        }}
                        buttonTextAfterSelection={(selectedItem) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item) => {
                            return item
                        }}
                    />
                </View>

                <View>
                    <Text style={styles.lbl}>CIDADE</Text>
                    <SelectDropdown
                        defaultButtonText="Selecione uma cidade"
                        buttonStyle={styles.btn1}
                        buttonTextStyle={styles.btntxt}
                        dropdownStyle={styles.selector}
                        rowTextStyle={styles.row}
                        data={lista}
                        ref={dropdownRef}
                        onSelect={(selectedItem) => {
                            setCidade(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item) => {
                            return item
                        }}
                    />
                </View>
            </View>

            <Button
				title="Salvar Cidade"
                style={styles.btn2}
				onPress={() => { vai.navigate("Rotas"); }}
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