import React from "react";
import Mapa from "src/views/main";
import Login from "src/views/login";
import { RecoilRoot } from "recoil";
import Cadastro from "src/views/cadastro";
import NovaSenha from "src/views/nova-senha";
import SelecionarRota from "src/views/select-rota";
import RecuperarSenha from "src/views/recuperar-senha";
import SelecionarCidade from "src/views/select-cidade";
import { SafeAreaView, StyleSheet } from "react-native";
import ParadaEmbarque from "src/views/parada-de-embarque";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export default function App() {
	const Stack = createNativeStackNavigator();

	return (
		<RecoilRoot>
			<SafeAreaView style={styles.container}>
				<NavigationContainer ref={navigationRef}>
					<Stack.Navigator>
						<Stack.Screen name="Log Out" component={Login} options={{ headerShown: false }} />
						<Stack.Screen name="Nova Senha" component={NovaSenha} options={{ headerShown: false }} />
						<Stack.Screen name="Recuperar Senha" component={RecuperarSenha} options={{ headerShown: false }} />
						<Stack.Screen name="Home" component={Mapa} options={{ headerShown: false }} />
						<Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
						<Stack.Screen name="Selecionar Rota" component={SelecionarRota} options={{ headerShown: false }} />
						<Stack.Screen name="Parada de Embarque" component={ParadaEmbarque} options={{ headerShown: false }} />
						<Stack.Screen name="Rotas" component={SelecionarRota} options={{ headerShown: false }} />
						<Stack.Screen name="Cidades" component={SelecionarCidade} options={{ headerShown: false }} />
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaView>
		</RecoilRoot>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
