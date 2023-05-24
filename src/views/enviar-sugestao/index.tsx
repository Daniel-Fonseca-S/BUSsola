import React from "react";
import {Button, TextInput, Text } from "@react-native-material/core";
import {View } from "react-native";
import style from "../cadastro/style";
import Menu from "src/components/menu";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EnviarSugestao({ navigation }: any){

    const styles = style;
    //const database = getDatabase(firebase);

    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <Menu></Menu>
                <View style={{width: "70%"}}>
                    <Text style={{fontSize: 25, color: "#B7B7B7", marginBottom: 10}}>
                        Encontrou algo de errado com sua parada de embarque - desembarque?
                    </Text>                    
                </View>
                <View style={styles.content}>
                    <Text style={{fontSize: 20, color: "#8C938D"}}>
                        Deixe aqui as suas sugestões de alterações e melhorias a respeito da sua parada.
                    </Text>
                    <TextInput     
                        style={styles.textInput}
                        keyboardType="default"
                    />
                </View>
                <View style={styles.content}>
                    <Text style={{fontSize: 25, color: "#B7B7B7", marginTop: 10}}>
                        Estrutual do ponto - pintura - banco - telhado - iluminação Referencias erradas - opções (atualizar referencia, ponto nao encontrado, alteração do ponto) Horário - Adiantado - atrazado Onibus - banco - botão parada
                    </Text>
                 
                </View>
            </View>
            <View style={styles.bottomContent}>
				<Button 
					style={styles.button} 
					title="Enviar"
					contentContainerStyle={{height: 50}}
					onPress={() => {navigation.navigate("Home");}}/>
			</View>
        </View>
    )
}