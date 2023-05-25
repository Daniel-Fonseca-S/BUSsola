import React, { useState } from "react";
import {Button, TextInput, Text } from "@react-native-material/core";
import { child, get, getDatabase, ref, set, update } from "firebase/database";
import {Alert, View } from "react-native";
import style from "../cadastro/style";
import useUsuario from "src/utils/hooks/useUsuario"
import Menu from "src/components/menu";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EnviarSugestao({ navigation }: any){
    const [sugestao, setSugestao] = useState("")
    const [loading, setLoading] = React.useState<boolean>(false);
    const styles = style;
    const usuario = useUsuario();
    const database = getDatabase();

    const idUsuario: string | undefined = usuario?.uid;

    async function setSugestaoDb() {
		setLoading(true);
		await set(ref(database, "observacao/" + idUsuario + new Date().toISOString().replace(".", "")), {
			sugestao
		}).then(() => {
			Alert.alert("observação enviada com sucesso!");
            console.log(sugestao)
			setLoading(false);
		}).catch((error) => {
			Alert.alert("Erro ao enviar observação!", error.message);
			setLoading(false);
            
		});
	}
    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <Menu></Menu>
                <View style={styles.content}>
                    <Text style={{ 
                        width: "92%", 
                        fontSize: 22, 
                        color: "#B7B7B7", 
                        marginTop: 15, 
                        marginBottom: 30}}>
                            Encontrou algo de errado com sua parada de embarque - desembarque?
                    </Text>                    
                </View>
                <View style={styles.content}>
                    <Text style={{
                        width: "80%", 
                        fontSize: 15, 
                        color: "#8C938D", marginBottom: 15, alignContent: "center"}}>
                            Deixe aqui as suas sugestões de alterações e melhorias a respeito da sua parada.
                    </Text>
                    <TextInput     
                        style={styles.textInput}
                        keyboardType="default"
                        onChangeText={((text: string) => setSugestao(text))}  //???
                    />
                </View>
                <View style={styles.content}>
                    <Text style={{ 
                        width: "92%", fontSize: 15, color: "#B7B7B7", marginTop: 15}}>
                            Estrutual do ponto - pintura - banco - telhado - iluminação {'\n'} Referencias erradas - opções (atualizar referencia, ponto nao encontrado,  alteração do ponto){'\n'} Horário - Adiantado - atrasado {'\n'} Onibus - banco - botão parada
                    </Text>
                 
                </View>
            </View>
            <View style={styles.bottomContent}>
				<Button 
					style={styles.button} 
					title="Enviar"
					contentContainerStyle={{height: 50}}
					onPress={() => {
                        setLoading(true);
                        setSugestaoDb();
                        setSugestao("");
                        navigation.goBack();
                    }}/>
			</View>
        </View>
    )
}